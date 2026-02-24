import { FaAngleDown } from "react-icons/fa";

type Props = {
  title: string;
  clickDrop?: boolean;
  options: any[];
  width?: string;
  bRadius?: string;
  onChange?: (value: string) => void;
  value?: string;
  disabled?: boolean;
};

const SelectButton = ({
  title,
  clickDrop,
  options,
  width,
  bRadius,
  onChange,
  value,
  disabled,
}: Props) => {
  return (
    <div
      style={{
        ...(width ? { width } : {}),
      }}
      className="relative w-fit flex items-center gap-1 border border-[#D0D5DD] text-[#667085] rounded-lg px-2 py-2 text-xs md:text-sm lg:text-base"
    >
      <p>{title}</p>
      <select
        id="customSelect"
        name="customSelect"
        className="appearance-none w-fit outline-0 text-[#101828] font-normal text-[10px] md:text-[14px] lg:text-[16px] cursor-pointer"
        onChange={(e) => onChange?.(e.target.value)}
        value={value}
        disabled={disabled}
      >
        {options?.map((opt, index) => (
          <option
            key={index}
            value={opt?.label === "All" ? opt?.value : opt?.value || opt}
          >
            {opt?.label || opt}
          </option>
        ))}
      </select>

      <FaAngleDown />
    </div>
  );
};

export default SelectButton;
