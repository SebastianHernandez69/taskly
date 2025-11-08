import { Input } from "../ui/input";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const FormInput = ({ ...props }: FormInputProps) => {
  return (
    <Input
      {...props}
      className={`h-12 text-base ${props.className ?? ""}`}
    />
  );
};
