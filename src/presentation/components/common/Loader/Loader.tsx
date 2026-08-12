import { ActivityIndicator, View } from "react-native";

import AppText from "../AppText";

import { LoaderProps } from "./types";
import { styles } from "./styles";

export default function Loader({ message = "Cargando..." }: LoaderProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />

      <AppText style={styles.message} color="textSecondary">
        {message}
      </AppText>
    </View>
  );
}
