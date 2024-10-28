/* eslint-disable react/display-name */
"use client";

import { forwardRef, useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import View from "../icons/authentication/View";
import EyeClosed from "../icons/authentication/EyeClosed";

const PasswordTextField = forwardRef((props, ref) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handlePasswordVisibility = (event) => {
    event.preventDefault();
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <TextField
      type={isPasswordVisible ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handlePasswordVisibility}>
              {isPasswordVisible ? <EyeClosed /> : <View />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      ref={ref}
      {...props}
    />
  );
});

export default PasswordTextField;
