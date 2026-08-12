import { TextProps } from "react-native";

export type TypographyVariant =
  "h1" | "h2" | "title" | "subtitle" | "body" | "caption" | "button";

export type TextColor =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "text"
  | "textSecondary";

export interface AppTextProps extends TextProps {
  children: React.ReactNode;

  variant?: TypographyVariant;

  color?: TextColor;

  bold?: boolean;

  center?: boolean;
}
