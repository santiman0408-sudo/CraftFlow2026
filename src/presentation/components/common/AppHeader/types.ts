import { ReactNode } from "react";
import { ViewStyle } from "react-native";

export interface AppHeaderProps {
  title: string;

  subtitle?: string;

  showBackButton?: boolean;

  onBackPress?: () => void;

  rightComponent?: ReactNode;

  style?: ViewStyle;
}
