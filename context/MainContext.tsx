import React, { createContext, useState, useContext } from "react";

const initialState = {
  isSavedNotificationOpen: false,
};

const Context = createContext<any>(null);

const MainContext = ({ children }: { children: React.ReactNode }) => {
  const [isSavedNotificationOpen, setIsSavedNotificationOpen] = useState(false);
  const [forceRerenderCount, setForceRerenderCount] = useState(0);

  return (
    <Context.Provider
      value={{
        isSavedNotificationOpen,
        setIsSavedNotificationOpen,
        forceRerenderCount,
        setForceRerenderCount,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default MainContext;

export const useMainContext = () => useContext(Context);
