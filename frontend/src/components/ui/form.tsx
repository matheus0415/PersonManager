import * as React from "react";
import {
  Controller,
  type FieldValues,
  type UseFormReturn,
  type FieldError,
  type Path,
  type ControllerRenderProps,
  type ControllerFieldState,
} from "react-hook-form";

export function Form({
  children,
  ...props
}: React.FormHTMLAttributes<HTMLFormElement>) {
  return <form {...props}>{children}</form>;
}

export function FormField<TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  render,
}: {
  control: UseFormReturn<TFieldValues>["control"];
  name: Path<TFieldValues>;
  render: (
    field: ControllerRenderProps<TFieldValues, Path<TFieldValues>> & {
      error?: FieldError;
    }
  ) => React.ReactElement;
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field,
        fieldState,
      }: {
        field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>;
        fieldState: ControllerFieldState;
      }) => render({ ...field, error: fieldState.error })}
    />
  );
}

export function FormItem({ children }: { children: React.ReactNode }) {
  return <div className="space-y-2">{children}</div>;
}

export function FormLabel({
  children,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label className="font-medium" {...props}>
      {children}
    </label>
  );
}

export function FormControl({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export function FormDescription({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-muted-foreground">{children}</p>;
}

export function FormMessage({ error }: { error?: { message?: string } }) {
  if (!error?.message) return null;
  return <span className="text-xs text-red-500">{error.message}</span>;
}
