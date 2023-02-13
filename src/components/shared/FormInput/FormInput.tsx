import React from "react";
import { type UseFormRegister  } from "react-hook-form";
import { clsx } from 'clsx';

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
    <div className='relative flex flex-col'>
      <label className="ml-2 text-xs zinc-300">{label}</label>
      {(register && field) && (
        <input
          className={clsx(
            "p-4 border-2 rounded-lg shadow-md shadow-black border-zinc-600 bg-zinc-900 text-zinc-200 focus:outline-zinc-100",
            {"border-red-400": error},
          )}
          defaultValue={defaultValue}
          type={type || 'text'}
          {...register(field)}
        />
      )}
      {children}
      {error && <div className="absolute text-xs text-left text-red-400 top-20 right-1">* {error}</div>}
    </div>
  )
}
