import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface SelectProps {
  id: string;
  label: string;
  options: { value: string; label: string }[];
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Select: React.FC<SelectProps> = ({
  id,
  label,
  options,
  disabled,
  required,
  register,
  errors,
}) => {
  return (
    <div className="w-full relative">
      <select
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        className={`
          peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed 
          pl-4
          ${errors[id] ? "border-red-500" : "border-neutral-300"}
          ${errors[id] ? "focus:border-red-500" : "focus:border-black"}
        `}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label
        className={`
          absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0]
          left-4
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-4
          ${errors[id] ? "text-red-500" : "text-zinc-400"}
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default Select;
