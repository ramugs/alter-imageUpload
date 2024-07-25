import DeleteIcon from "../../assests/icons/deleteIcon.png";
import RemoveIcon from "../../assests/icons/removeIcon.svg";

type buttonProps = {
  type?: "button" | "submit" | "reset";
  name: string | JSX.Element;
  onclick?: () => void;
  disabled?: boolean;
  padding?: string;
};

type buttonWithIconProps = {
  type?: "button" | "submit" | "reset";
  name: string | JSX.Element;
  onclick?: () => void;
  disabled?: boolean;
  icon?: string;
  padding?: string;
};

type buttonIconProps = {
  type?: "button" | "submit" | "reset";
  onclick?: () => void;
  disabled?: boolean;
  icon?: string;
  padding?: string;
};

export const PrimaryButton = ({
  type = "button",
  name,
  onclick,
  disabled = false,
  padding = "py-3 px-5",
}: buttonProps) => {
  return (
    <button
      type={type}
      onClick={onclick}
      className={`text-16 ${
        disabled
          ? "text-neutral-400 bg-neutral-100"
          : "text-white bg-indigo-700 hover:bg-indigo-800"
      }  font-medium flex justify-center items-center shadow-2 rounded ${padding}  focus:outline-none focus:ring focus:ring-indigo-100 `}
      disabled={disabled}
    >
      {name}
    </button>
  );
};

export const SecondButton = ({
  type = "button",
  name,
  onclick,
  disabled = false,
  padding = "py-3 px-5",
}: buttonProps) => {
  return (
    <button
      type={type}
      onClick={onclick}
      className={`text-16 ${
        disabled
          ? "text-neutral-400 bg-neutral-100"
          : "text-neutral-900 bg-white hover:bg-neutral-50 border border-neutral-200"
      }   font-medium  shadow-2 rounded ${padding}  focus:outline-none focus:ring focus:ring-indigo-100 `}
      disabled={disabled}
    >
      {name}
    </button>
  );
};

export const IconWithButton = ({
  type = "button",
  name,
  onclick,
  disabled = false,
  icon = DeleteIcon,
  padding = "px-1",
}: buttonWithIconProps) => {
  return (
    <button
      type={type}
      onClick={onclick}
      className={`text-14 flex gap-2 justify-center items-center ${
        disabled
          ? "text-neutral-400"
          : "text-neutral-600 hover:text-neutral-900"
      }   font-medium  rounded ${padding} focus:outline-none focus:ring focus:ring-indigo-100`}
      disabled={disabled}
    >
      <img src={icon} alt="Delete Icon" /> {name}
    </button>
  );
};

export const IconButton = ({
  type = "button",
  onclick,
  disabled = false,
  icon = RemoveIcon,
  padding = "p-1",
}: buttonIconProps) => {
  const iconColor = disabled ? "#A3A3A3" : "#000000";
  return (
    <button
      type={type}
      onClick={onclick}
      className={`text-14 flex gap-2 justify-center items-center ${
        disabled
          ? "text-neutral-400"
          : "text-neutral-600 hover:text-neutral-900"
      }   font-medium  rounded ${padding} focus:outline-none focus:ring focus:ring-indigo-100`}
      disabled={disabled}
      style={{ "--icon-color": iconColor } as React.CSSProperties}
    >
      <img
        src={icon}
        alt="Remove Icon"
        style={{ "--icon-color": iconColor } as React.CSSProperties}
      />
    </button>
  );
};
