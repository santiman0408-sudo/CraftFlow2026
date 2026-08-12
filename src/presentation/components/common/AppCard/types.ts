import { ViewProps, ViewStyle } from "react-native";

export interface AppCardProps extends ViewProps {
  children: React.ReactNode;

  padding?: number;

  style?: ViewStyle;
}
