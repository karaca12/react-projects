import React, { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const ErrorAlert = ({ show, message, duration = 5000 }) => {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    setVisible(show);

    if (show) {
      const timeout = setTimeout(() => {
        setVisible(false);
      }, duration);

      return () => clearTimeout(timeout);
    }
  }, [show, duration]);

  return (
    <div>
      {visible && (
        <Alert severity="error" style={{ marginTop: "1rem" }}>
          <AlertTitle>Error</AlertTitle>
          {message}
        </Alert>
      )}
    </div>
  );
};

export default ErrorAlert;
