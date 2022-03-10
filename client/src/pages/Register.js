import { useMutation } from "@apollo/client";
import React, { useContext, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { userRegister } from "../queries/queries";
import { useForm } from "../util/customHook";
import { AuthContext } from "../context/auth";

function Register() {
  const [error, setError] = useState("");
  const authCtx=useContext(AuthContext);
  const navigate = useNavigate();
  const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const { changeValuesHandler, values, submitHandler } = useForm(
    registerUser,
    initialState
  );

  const [addUser, { loading }] = useMutation(userRegister, {
    update(proxy, result) {
      authCtx.login(result.data.register);
      navigate("/");
    },
    onError(err) {
      setError(JSON.parse(err.graphQLErrors[0].message));
    },
    variables: values,
  });

  function registerUser() {
    addUser();
  }
  return (
    <div className="form-container">
      <Form
        onSubmit={submitHandler}
        noValidate
        className={loading ? "loading" : ""}
      >
        <h1>Register</h1>
        <Form.Input
          label="UserName"
          placeholder="UserName"
          name="name"
          type="text"
          value={values.name}
          error={error.name ? true : false}
          onChange={changeValuesHandler}
        />
        <Form.Input
          label="Email"
          placeholder="Email"
          name="email"
          type="email"
          error={error.email ? true : false}
          value={values.email}
          onChange={changeValuesHandler}
        />
        <Form.Input
          label="Password"
          placeholder="Password"
          name="password"
          type="password"
          error={error.password ? true : false}
          value={values.password}
          onChange={changeValuesHandler}
        />
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password"
          name="confirmPassword"
          error={error.password ? true : false}
          type="password"
          value={values.confirmPassword}
          onChange={changeValuesHandler}
        />
        <Button type="submit" primary>
          Register
        </Button>
      </Form>
      {Object.keys(error).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(error).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Register;
