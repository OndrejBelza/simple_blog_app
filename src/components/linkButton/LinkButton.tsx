import { Button, ButtonProps } from "primereact/button";
import { FC } from "react";
import { Link } from "react-router-dom";
import "./LinkButton.css";
interface LinkButtonProps extends ButtonProps {
  to: string;
}
const LinkButton: FC<LinkButtonProps> = (props) => {
  return (
    <>
      <Link to={props.to} className="link-button">
        <Button {...props} />
      </Link>
    </>
  );
};

export default LinkButton;
