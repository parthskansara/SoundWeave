import React, { useCallback, useState } from "react";

export const ToastContext = React.createContext();

export const ToastProvider = ({children}) => {

    const [toast, setToast] = useState({ show: false, message: '' });

    const showToast = useCallback((message) => {
      setToast({ show: true, message });
      setTimeout(() => setToast({ show: false, message: '' }), 3000); // Hide after 3 seconds
    }, []);

    const value = {
        toast,
        setToast,
        showToast
    };

    return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
};