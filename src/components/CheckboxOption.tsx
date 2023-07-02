import React from "react";
import { type FieldValues, type UseFormRegister } from "react-hook-form";

const CheckboxOption = ({
  name,
  register,
}: {
  name: string;
  register: UseFormRegister<FieldValues>;
}) => {
  return (
    <li>
      <label className="flex items-center rounded p-2 hover:bg-[#777777]">
        <input
          {...register(`platforms`)}
          type="checkbox"
          className="h-4 w-4 rounded accent-[#8578E6]"
          value={name}
        />

        <span className="ml-2 w-full rounded">{name}</span>
      </label>
    </li>
  );
};

export default CheckboxOption;
