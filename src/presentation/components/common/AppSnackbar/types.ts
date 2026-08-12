export type SnackbarType = "success" | "error" | "warning" | "info";

export interface AppSnackbarProps {
  visible: boolean;

  message: string;

  type?: SnackbarType;

  duration?: number;

  onHide(): void;
}
