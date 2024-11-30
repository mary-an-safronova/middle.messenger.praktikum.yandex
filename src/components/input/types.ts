export type TInputProps = {
  name?: string;
  id?: string;
  type?: string;
  error?: boolean;
  value?: string;
  required?: boolean;
  maxlength?: number;
  placeholder?: string;
  searchIcon?: string;
  errorText?: string;
  styleType?: 'default' | 'infoitem' | 'message';
  standartPlaceholder?: string;
  onChange?: (evt: Event) => void;
};
