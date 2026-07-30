type FormInputProps = {
  label: string;
  id: string;
  type?: string;
  value: string | number;
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>
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
  onChange,
}: FormInputProps) {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="mb-2 block font-semibold text-gray-700"
      >
        {label}
      </label>

      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        min={min}
        max={max}
        onChange={onChange}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-600"
      />
    </div>
  );
}

export default FormInput;