import { View } from "react-native";

import { styles } from "./styles";
import { AppCardProps } from "./types";

export default function AppCard({
  children,

  padding = 16,

  style,

  ...props
}: AppCardProps) {
  return (
    <View
      {...props}
      style={[
        styles.card,
        {
          padding,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
