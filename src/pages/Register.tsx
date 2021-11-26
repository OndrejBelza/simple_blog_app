import { FC, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import client from "../utils/client";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../hooks/redux";
import { getUserData } from "../store/reducers/userReducer";

interface FormData {
  username: string;
  password: string;
}
const Register: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });

  const formChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newData = { ...formData };
    newData[e.target.name as keyof FormData] = e.target.value;

    setFormData(newData);
  };
  const register = async () => {
    try {
      await client.post("/auth/register", formData);
      dispatch(getUserData());
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="p-grid p-justify-center p-m-0">
        <div className="p-col-11 p-md-6 p-lg-4">
          <h2 className="p-text-center">Register</h2>
          <div className="p-fluid">
            <div className="p-field">
              <label htmlFor="username">Username</label>
              <InputText
                id="username"
                type="text"
                value={formData.username}
                name="username"
                onChange={formChangeHandler}
              />
            </div>
            <div className="p-field">
              <label htmlFor="password">Password</label>
              <InputText
                id="password"
                type="password"
                value={formData.password}
                name="password"
                onChange={formChangeHandler}
              />
            </div>
            <div className="p-my-2">
              <Button label="Register" onClick={register} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
