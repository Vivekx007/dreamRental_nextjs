'use client';

import { createContext, useContext, useState } from 'react';

// Create a context to store the global state
const GlobalContext = createContext();

// Create a provider to wrap the app and provide the global state
export const GlobalProvider = ({ children }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  return (
    <GlobalContext.Provider value={{ unreadCount, setUnreadCount }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Create a custom hook to access the global state
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
