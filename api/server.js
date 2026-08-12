const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || "0.0.0.0";
const DATA_DIR = path.join(__dirname, "data");
const DATA_FILE = path.join(DATA_DIR, "craftflow.json");
const INITIAL_DATA = { clientes: [], categorias: [], productos: [], pedidos: [] };
const collections = new Set(Object.keys(INITIAL_DATA));

function ensureData(){ fs.mkdirSync(DATA_DIR,{recursive:true}); if(!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE,JSON.stringify(INITIAL_DATA,null,2)); }
function readData(){ ensureData(); return JSON.parse(fs.readFileSync(DATA_FILE,"utf8")); }
function writeData(data){ fs.writeFileSync(DATA_FILE,JSON.stringify(data,null,2)); }
function headers(){ return {"Content-Type":"application/json; charset=utf-8","Access-Control-Allow-Origin":"*","Access-Control-Allow-Headers":"Content-Type, Authorization","Access-Control-Allow-Methods":"GET,POST,PUT,DELETE,OPTIONS"}; }
function send(res,status,body){ res.writeHead(status,headers()); res.end(JSON.stringify(body)); }
function noContent(res){ res.writeHead(204,headers()); res.end(); }
function parseBody(req){ return new Promise((resolve,reject)=>{let raw="";req.on("data",c=>{raw+=c;if(raw.length>1000000)reject(new Error("Payload demasiado grande"));});req.on("end",()=>{if(!raw.trim())return resolve({});try{resolve(JSON.parse(raw));}catch{reject(new Error("JSON inválido"));}});req.on("error",reject);});}
function nextId(items){return items.reduce((m,x)=>Math.max(m,Number(x.id)||0),0)+1;}
function validate(resource,b){ if(resource==="clientes"||resource==="categorias"){if(!String(b.nombre||"").trim())return "nombre es obligatorio";} if(resource==="productos"){if(!String(b.nombre||"").trim())return "nombre es obligatorio";if(!Number.isFinite(Number(b.precio)))return "precio debe ser numérico";if(!Number.isInteger(Number(b.categoriaId)))return "categoriaId debe ser entero";} if(resource==="pedidos"){for(const k of ["clienteId","productoId","cantidad","precioUnitario","total","estado","fecha"])if(b[k]===undefined||b[k]===null||b[k]==="")return `${k} es obligatorio`;} return null;}
function normalize(resource,b,id){const x={...b,id};if(resource==="productos"){x.precio=Number(x.precio);x.categoriaId=Number(x.categoriaId);}if(resource==="pedidos"){for(const k of ["clienteId","productoId","cantidad"])x[k]=Number(x[k]);for(const k of ["precioUnitario","total"])x[k]=Number(x[k]);}return x;}
function dashboard(d){const p=d.pedidos;return{totalPedidos:p.length,pedidosPendientes:p.filter(x=>x.estado==="PENDIENTE").length,pedidosEntregados:p.filter(x=>x.estado==="ENTREGADO").length,ventasTotales:p.filter(x=>x.estado!=="CANCELADO").reduce((s,x)=>s+Number(x.total||0),0),productosVendidos:p.filter(x=>x.estado!=="CANCELADO").reduce((s,x)=>s+Number(x.cantidad||0),0)};}

const server=http.createServer(async(req,res)=>{
  if(req.method==="OPTIONS")return noContent(res);
  const url=new URL(req.url,`http://${req.headers.host||"localhost"}`);const parts=url.pathname.split("/").filter(Boolean);
  if(req.method==="GET"&&url.pathname==="/api/health")return send(res,200,{status:"ok",service:"CraftFlow API REST",version:"1.0.0"});
  if(req.method==="POST"&&url.pathname==="/api/auth/login"){try{const b=await parseBody(req);if(b.username==="admin"&&b.password==="CraftFlow2026")return send(res,200,{authenticated:true,user:{username:"admin"}});return send(res,401,{authenticated:false,message:"Credenciales incorrectas"});}catch(e){return send(res,400,{message:e.message});}}
  if(parts[0]!=="api")return send(res,404,{message:"Ruta no encontrada"});
  const resource=parts[1];
  if(resource==="dashboard"&&req.method==="GET")return send(res,200,dashboard(readData()));
  if(resource==="sync"&&req.method==="POST"){
    try{
      const b=await parseBody(req);
      const synced={clientes:Array.isArray(b.clientes)?b.clientes:[],categorias:Array.isArray(b.categorias)?b.categorias:[],productos:Array.isArray(b.productos)?b.productos:[],pedidos:Array.isArray(b.pedidos)?b.pedidos:[]};
      writeData(synced);
      return send(res,200,{ok:true,message:"Datos locales sincronizados con CraftFlow API REST",summary:{clientes:synced.clientes.length,categorias:synced.categorias.length,productos:synced.productos.length,pedidos:synced.pedidos.length}});
    }catch(e){return send(res,400,{ok:false,message:e.message||"Error sincronizando datos"});}
  }
  if(!collections.has(resource))return send(res,404,{message:"Recurso no encontrado"});
  const data=readData(),items=data[resource],id=parts[2]?Number(parts[2]):null;
  try{
    if(req.method==="GET"&&id===null)return send(res,200,items);
    if(req.method==="GET"&&id!==null){const item=items.find(x=>Number(x.id)===id);return item?send(res,200,item):send(res,404,{message:"Registro no encontrado"});}
    if(req.method==="POST"&&id===null){const b=await parseBody(req),err=validate(resource,b);if(err)return send(res,400,{message:err});const item=normalize(resource,b,nextId(items));items.push(item);writeData(data);return send(res,201,item);}
    if((req.method==="PUT"||req.method==="PATCH")&&id!==null){const i=items.findIndex(x=>Number(x.id)===id);if(i<0)return send(res,404,{message:"Registro no encontrado"});const b=await parseBody(req),merged={...items[i],...b},err=validate(resource,merged);if(err)return send(res,400,{message:err});items[i]=normalize(resource,merged,id);writeData(data);return send(res,200,items[i]);}
    if(req.method==="DELETE"&&id!==null){const i=items.findIndex(x=>Number(x.id)===id);if(i<0)return send(res,404,{message:"Registro no encontrado"});const [deleted]=items.splice(i,1);writeData(data);return send(res,200,{deleted});}
    return send(res,405,{message:"Método no permitido"});
  }catch(e){return send(res,500,{message:e.message||"Error interno"});}
});
ensureData();server.listen(PORT,HOST,()=>console.log(`CraftFlow API REST: http://localhost:${PORT}`));
