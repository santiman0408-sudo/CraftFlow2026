import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AppText from "../AppText";

import { EmptyStateProps } from "./types";
import { styles } from "./styles";

export default function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Ionicons name="folder-open-outline" size={64} color="#9CA3AF" />

      <AppText variant="subtitle" bold style={styles.title}>
        {title}
      </AppText>

      {description ? (
        <AppText color="textSecondary" center style={styles.description}>
          {description}
        </AppText>
      ) : null}
    </View>
  );
}
