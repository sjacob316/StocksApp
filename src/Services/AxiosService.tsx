import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import Snackbar from "@material-ui/core/Snackbar";

export const APICheck = () => {
  const [warningOpen, setWarningOpen] = useState(false);
  useEffect(() => {}, []);

  axios.defaults.baseURL = "http://localhost:4000/";
  axios.interceptors.response.use((response) => {
    if (response.data.Note) {
      setWarningOpen(true);
    }
    return response;
  });

  return (
    <Snackbar
      open={warningOpen}
      onClose={() => setWarningOpen(false)}
      message="Sorry, too many API Calls. Please wait 1 minute."
      autoHideDuration={6000}
    />
  );
};

export default axios;
