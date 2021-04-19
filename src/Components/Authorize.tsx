import React, { useEffect } from "react";
import Cookies from "js-cookie";

export function Authorize() {
  let token;
  useEffect(() => {
    token = Cookies.get();
  });

  return <></>;
}
