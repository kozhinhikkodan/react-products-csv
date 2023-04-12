import React, { useState } from "react";
import { Login } from "./Login";
import { Register } from "./Register";
import { Outlet } from "react-router-dom";

function Root() {
  return <Outlet />;
}

export default Root;
