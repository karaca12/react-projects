/* import React, { useState, useEffect } from "react";
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
 */

import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const ErrorAlert = ({ show, message, duration = 5000, onClose }) => {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    setVisible(show);
  }, [show]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setVisible(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      open={visible}
      autoHideDuration={duration}
      onClose={handleClose}
    >
      <Alert severity="error" onClose={handleClose}>
        <AlertTitle>Error</AlertTitle>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ErrorAlert;
