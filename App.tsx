import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { initializeDatabase } from "@/database";
import { syncLocalDataToApi } from "@/services/api/api.sync";
import { RootNavigator } from "@/presentation/navigation";
import AppProvider from "@/presentation/context/AppProvider";

export default function App() {
  useEffect(() => {
    initializeDatabase();
    void syncLocalDataToApi();
  }, []);

  return (
    <SafeAreaProvider>
      <AppProvider>
        <StatusBar style="dark" />

        <RootNavigator />
      </AppProvider>
    </SafeAreaProvider>
  );
}
