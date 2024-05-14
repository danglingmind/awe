"use client";
import React, { ReactNode } from "react";
import { createContext, useState } from "react";

interface UserContextInterface {
  userId: string;
}
type Props = {
  children: ReactNode;
};

export const UserContext = createContext({} as UserContextInterface);

export const UserContextProvider: React.FC<Props> = ({ children }) => {
  const [userId, setUserId] = useState("");

  return (
    <UserContext.Provider value={{ userId }}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => React.useContext(UserContext);
