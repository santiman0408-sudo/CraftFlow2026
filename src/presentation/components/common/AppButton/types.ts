import { TouchableOpacityProps } from "react-native";

export type ButtonVariant = "primary" | "secondary" | "outline" | "danger";

export interface AppButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: ButtonVariant;
  loading?: boolean;
}
