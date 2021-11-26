import { Button } from "primereact/button";
import { Menubar } from "primereact/menubar";
import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { clearUser, selectUser } from "../../store/reducers/userReducer";
import client from "../../utils/client";
import LinkButton from "../linkButton/LinkButton";
const Header: FC = () => {
  const logout = () => {
    client.post("auth/logout");
    dispatch(clearUser());
  };

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => selectUser(state));

  const start = (
    <>
      <div className="p-d-flex p-ai-center p-jc-center">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAHXPluq6GtTRPDIHRv5kJPy86uFjp5sO7hg&usqp=CAU"
          alt="app logo logo"
          height="40"></img>
        <span className="p-ml-2 p-text-bold">Blog</span>
      </div>
    </>
  );

  const end = (
    <>
      {!user ? (
        <>
          <LinkButton
            label="Login"
            className="p-button-text p-button-plain"
            icon="pi pi-lock-open"
            to="login"
          />
          <LinkButton
            label="Register"
            className="p-button-text p-button-plain"
            icon="pi pi-pencil"
            to="register"
          />
        </>
      ) : (
        <>
          <Button
            label="Logout"
            className="p-button-text p-button-plain"
            onClick={logout}
          />
        </>
      )}
    </>
  );

  return (
    <>
      <Menubar start={start} end={end} />
    </>
  );
};

export default Header;
