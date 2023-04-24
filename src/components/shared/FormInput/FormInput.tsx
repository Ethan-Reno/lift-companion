import React from "react";
import { type UseFormRegister  } from "react-hook-form";
import { Input, Label } from "lift-companion-ui";

export interface FormInputProps {
  label: string;
  register: UseFormRegister<any>;
  field: string;
  error?: string;
  type?: string;
  defaultValue?: string;
}

export const FormInput = ({register, field, label, error, type, defaultValue}: FormInputProps) => {
  return (
    <div className='relative flex flex-col gap-2'>
      <Label htmlForm={field}>{label}</Label>
      <Input
        defaultValue={defaultValue || ''}
        type={type || 'text'}
        id={field}
        {...register(field)}
      />
      {error && <div className="absolute text-xs text-left text-red-400 top-20 right-1">* {error}</div>}
    </div>
  )
}
