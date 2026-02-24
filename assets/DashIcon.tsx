type Props = {
  className?: string;
  stroke?: string;
};

const DashIcon = ({ className, stroke }: Props) => {
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
        d="M18 20.4V10.4M12 20.4V4.4M6 20.4V14.4"
        // stroke="#98A2B3"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DashIcon;
