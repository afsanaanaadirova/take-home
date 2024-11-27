import { FC } from "react";
import { XMarkIcon } from "./icons";

type ButtonProps = React.ComponentProps<"button">;

export const ExpandButton: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button className="hover:text-gray-700 transition-colors flex items-center justify-center" {...props}>
      {children}
    </button>
  );
};

export const DeleteButton: FC<Omit<ButtonProps, "children">> = (props) => {
  return (
    <button className="hover:text-gray-700 transition-colors flex items-center justify-center" {...props}>
      <XMarkIcon />
    </button>
  );
};

type ToggleButtonProps = {
  isActive: boolean;
  onToggle: () => void;
  active?: React.ReactNode;
  inactive?: React.ReactNode;
};

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  isActive,
  onToggle,
  active,
  inactive,
}) => {
  return (
    <button
      onClick={onToggle}
      className={"px-4 py-2 rounded transition-colors"}
    >
      {isActive ? active : inactive}
    </button>
  );
};
