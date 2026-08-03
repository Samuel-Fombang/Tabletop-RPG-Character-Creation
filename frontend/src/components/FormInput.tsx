import type {
  ChangeEvent,
  HTMLInputTypeAttribute,
} from "react";

type FormInputProps = {
  label: string;
  id: string;
  type?: HTMLInputTypeAttribute;
  value: string | number;
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
  disabled?: boolean;
  autoComplete?: string;
  error?: string;
  helperText?: string;
  onChange: (
    event: ChangeEvent<HTMLInputElement>,
  ) => void;
};

function FormInput({
  label,
  id,
  type = "text",
  value,
  placeholder,
  required = false,
  min,
  max,
  disabled = false,
  autoComplete,
  error,
  helperText,
  onChange,
}: FormInputProps) {
  const inputClassName = [
    "w-full rounded-xl border px-4 py-3",
    "text-slate-900 outline-none transition duration-200",
    "placeholder:text-slate-400",
    "focus:ring-4",
    disabled
      ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-500"
      : "bg-white",
    error
      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
      : "border-slate-300 hover:border-slate-400 focus:border-purple-500 focus:ring-purple-100",
  ].join(" ");

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-semibold text-slate-700"
      >
        {label}

        {required && (
          <span
            className="ml-1 text-red-500"
            aria-hidden="true"
          >
            *
          </span>
        )}
      </label>

      <input
        id={id}
        name={id}
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        min={min}
        max={max}
        disabled={disabled}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={
          error
            ? `${id}-error`
            : helperText
              ? `${id}-helper`
              : undefined
        }
        onChange={onChange}
        className={inputClassName}
      />

      {error && (
        <p
          id={`${id}-error`}
          className="mt-2 text-sm font-medium text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}

      {!error && helperText && (
        <p
          id={`${id}-helper`}
          className="mt-2 text-sm text-slate-500"
        >
          {helperText}
        </p>
      )}
    </div>
  );
}

export default FormInput;