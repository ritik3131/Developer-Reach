import { useMutation } from "@apollo/client";
import React, { useContext, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../queries/queries";
import { useForm } from "../util/customHook";
import { AuthContext } from "../context/auth";

function Login() {
  const [error, setError] = useState("");
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const initialState = {
    email: "",
    password: "",
  };

  const { changeValuesHandler, values, submitHandler } = useForm(
    loginUsers,
    initialState
  );

  const [loginUser, { loading }] = useMutation(userLogin, {
    update(proxy, result) {
      authCtx.login(result.data.login);
      navigate("/");
    },
    onError(err) {
      setError(JSON.parse(err.graphQLErrors[0].message));
    },
    variables: values,
  });

  function loginUsers() {
    loginUser();
  }
  return (
    <div className="form-container">
      <Form
        onSubmit={submitHandler}
        noValidate
        className={loading ? "loading" : ""}
      >
        <h1>Login</h1>
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
        <Button type="submit" primary>
          Login
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

export default Login;
