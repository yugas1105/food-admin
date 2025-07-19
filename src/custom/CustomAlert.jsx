import { createContext, useContext, useState } from "react";
import { Alert, Snackbar } from "@mui/material";

const AlertContext = createContext();

export const useAlert = () => {
  return useContext(AlertContext);
};

export const AlertProvider = ({ children }) => {
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    severity: "info", //"error", "warning", "info", "success"
    timer: 3000, // Default to 1 second
  });

  const showAlert = (message, severity = "info", timer = 3000) => {
    setAlertState({ open: true, message, severity, timer });
  };

  const hideAlert = () => {
    setAlertState((prev) => ({ ...prev, open: false }));
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <Snackbar
        open={alertState.open}
        autoHideDuration={alertState.timer} //use the timer from state
        onClose={hideAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={hideAlert} severity={alertState.severity}>
          {alertState.message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
};
