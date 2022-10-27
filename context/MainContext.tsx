import React, { createContext, useState, useContext } from "react";

const initialState = {
  isSavedNotificationOpen: false,
};

const Context = createContext<any>(null);

const MainContext = ({ children }: { children: React.ReactNode }) => {
  const [isSavedNotificationOpen, setIsSavedNotificationOpen] = useState(false);

  return (
    <Context.Provider
      value={{ isSavedNotificationOpen, setIsSavedNotificationOpen }}
    >
      {children}
    </Context.Provider>
  );
};

export default MainContext;

export const useMainContext = () => useContext(Context);
