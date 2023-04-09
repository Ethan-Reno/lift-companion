import React from "react";
import { type UseFormRegister  } from "react-hook-form";
import { clsx } from 'clsx';
import { Input, Label } from "lift-companion-ui";

export interface FormInputProps {
  label: string;
  register?: UseFormRegister<any>;
  field?: string;
  error?: string;
  type?: string;
  defaultValue?: string;
  children?: JSX.Element | JSX.Element[] | any;
}

export const FormInput = ({register, field, label, error, type, defaultValue, children}: FormInputProps) => {
  return (
    <div className='relative flex flex-col gap-2'>
      <Label htmlForm={type}>{label}</Label>
      {(register && field) && (
        <Input
          className={clsx(
            {"border-red-400": error},
          )}
          defaultValue={defaultValue}
          type={type || 'text'}
          id={type}
          {...register(field)}
        />
      )}
      {children}
      {error && <div className="absolute text-xs text-left text-red-400 top-20 right-1">* {error}</div>}
    </div>
  )
}
