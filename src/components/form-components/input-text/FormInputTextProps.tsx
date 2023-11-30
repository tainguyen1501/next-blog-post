export interface FormInputTextProps {
    name: string;
    control: any;
    label?: string;
    setValue?: any;
    options?: any;
    rows?: number
    placeholder?: string
    required?: boolean
    type?: 'text' | 'email' | 'password' | 'number'
    className?: string
    pattern?: any
  }
  