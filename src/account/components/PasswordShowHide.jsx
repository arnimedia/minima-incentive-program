import React, { useState, useEffect } from "react";

const PasswordShowHide = ({ field, form }) => {
  const [showHidePassword, changeShowHidePassword] = useState(false);
  const hasError = form.touched[field.name] && form.errors[field.name];
  const passShowIcon = !showHidePassword? "icon-on" : "icon-off"
  const placeHolder = field.name === "confirmPassword" ? "Confirm password*" : "Enter password*"

  return (
    <>
      <i
        className={hasError ? "" : "" + passShowIcon}
        onClick={() => changeShowHidePassword(!showHidePassword)}
      > 
      </i>
      <input
        type={showHidePassword ? "text" : "password"}
        {...field}
        className={hasError ? "is-invalid form-control" : "form-control"}
        placeholder={placeHolder}
      />
    </>
  );
};

export default PasswordShowHide;
