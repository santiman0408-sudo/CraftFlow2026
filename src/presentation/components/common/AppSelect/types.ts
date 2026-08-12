export interface AppSelectOption {
  label: string;
  value: string | number;
}

export interface AppSelectProps {
  label?: string;
  value: string | number;
  options: AppSelectOption[];
  onValueChange: (value: string | number) => void;
  placeholder?: string;
}
