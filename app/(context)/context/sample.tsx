"use client";
import React, { ReactNode } from "react";
import { createContext, useState } from "react";

interface CounterContextInterface {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}
type Props = {
  children: ReactNode;
};

export const CounterContext = createContext({} as CounterContextInterface);

export const CounterContextProvider: React.FC<Props> = ({ children }) => {
  const [count, setCount] = useState(1);

  return (
    <CounterContext.Provider value={{ count, setCount }}>
      {children}
    </CounterContext.Provider>
  );
};

export const useCounterContext = () => React.useContext(CounterContext);
