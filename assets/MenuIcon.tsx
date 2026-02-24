type Props = {
  className?: string;
  stroke?: string;
};

const MenuIcon = ({ className, stroke }: Props) => {
  return (
    <svg
      className={className}
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 17.2L12 22.2L22 17.2M2 12.2L12 17.2L22 12.2M12 2.2L2 7.2L12 12.2L22 7.2L12 2.2Z"
        // stroke="white"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MenuIcon;
