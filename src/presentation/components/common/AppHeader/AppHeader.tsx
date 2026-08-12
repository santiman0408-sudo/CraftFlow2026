import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AppText from "../AppText";

import { AppHeaderProps } from "./types";
import { styles } from "./styles";

export default function AppHeader({
  title,
  subtitle,
  showBackButton = false,
  onBackPress,
  rightComponent,
  style,
}: AppHeaderProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.left}>
        {showBackButton && (
          <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
            <Ionicons name="arrow-back" size={24} color="#1F2937" />
          </TouchableOpacity>
        )}

        <View style={styles.content}>
          <AppText variant="title" bold>
            {title}
          </AppText>

          {subtitle ? (
            <AppText variant="caption" color="textSecondary">
              {subtitle}
            </AppText>
          ) : null}
        </View>
      </View>

      {rightComponent}
    </View>
  );
}
