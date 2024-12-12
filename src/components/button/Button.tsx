import { FC } from "react";



interface IProps {
  className: string;
  label: string;
  disabled?: boolean;
  handleClick?: () => void
}

const Button: FC<IProps> = (props) => {
  return (
    <button className={props.className} disabled={props.disabled} onClick={props.handleClick}>{props.label}</button>
  );
};

export default Button;
