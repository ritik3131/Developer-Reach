module.exports.vaidateRegisterInput = (
  email,
  password,
  confirmPassword,
  name
) => {
  let errors = {};
  if (name.trim().length === 0) errors.name = "UserName must not be empty";
  if (email.trim().length === 0) errors.email = "Email must not be empty";
  else {
    const reg =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(reg)) errors.email = "Email must be a valid email address";
  }
  if (password.trim().length < 5)
    errors.password = "Password must be length of 5";
  else if (password !== confirmPassword)
    errors.password = "Password must be equal";
  return {
    errors,
    valid: Object.keys(errors).length === 0,
  };
};

module.exports.validateLoginInput = (email, password) => {
  const errors = {};

  if (email.trim().length === 0) errors.email = "Email must not be empty";
  else {
    const reg =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(reg)) errors.email = "Email must be a valid email address";
  }
  if (password.trim().length < 5)
    errors.password = "Password must be length of 5";
  return {
    errors,
    valid: Object.keys(errors).length === 0,
  };
};
