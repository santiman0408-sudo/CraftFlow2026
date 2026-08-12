import { Text } from "react-native";

import { AppTextProps } from "./types";
import { styles } from "./styles";

export default function AppText({
  children,
  variant = "body",
  color = "text",
  bold = false,
  center = false,
  style,
  ...props
}: AppTextProps) {
  return (
    <Text
      {...props}
      style={[
        styles[variant],
        styles[color],
        bold && styles.bold,
        center && styles.center,
        style,
      ]}
    >
      {children}
    </Text>
  );
}
