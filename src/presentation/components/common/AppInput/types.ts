import { TextInputProps, ViewStyle, TextStyle } from "react-native";

export interface AppInputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
}
