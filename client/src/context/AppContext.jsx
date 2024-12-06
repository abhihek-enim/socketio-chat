/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import Loader from "../components/Loader";
export const AppContext = createContext();

const AppContextProvider = (props) => {
  // Initialize user state from localStorage
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(false);
  const showLoader = () => {
    setLoading(true);
  };
  const hideLoader = () => {
    setLoading(false);
  };

  // Persist user state to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const value = {
    user,
    setUser,
    showLoader,
    hideLoader,
    loading,
  };

  return (
    <AppContext.Provider value={value}>
      {loading && <Loader />}
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
