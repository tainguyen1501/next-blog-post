import { Controller } from "react-hook-form";
import { FormInputTextProps } from "./FormInputTextProps";
import Label from "../label/Label";

export const FormInputText = ({
  name,
  control,
  placeholder,
  className,
  pattern,
  label,
  required,
  type = "text",
}: FormInputTextProps) => {
  return (
    <div>
      {label && <Label label={label} required={required} />}
      <Controller
        // defaultValue = {''}
        name={name}
        control={control}
        rules={{
          required: { message: `${label} is required`, value: !!required },
          pattern: pattern,
        }}
        render={({
          field: { onChange, value },
          fieldState: { error },
          formState,
        }) => (
          <>
            <input
              className={className}
              value={value || ''}
              type={type}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              required={required}
            />
            {error && (
              <p style={{ color: "#f16d75", fontSize: 13, marginBottom: 10 }}>
                {error.message}
              </p>
            )}
          </>
        )}
      />
    </div>
  );
};
