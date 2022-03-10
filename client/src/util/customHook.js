import { useState } from "react";

export const useForm = (cb, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const changeValuesHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    cb();
  };

  return {
    submitHandler,
    changeValuesHandler,
    values,
  };
};
