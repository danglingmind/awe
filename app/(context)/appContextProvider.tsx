import { ComponentProps, FC, ReactNode } from "react";
import providers from "@/app/(context)/providers";

type fcProp = {
  children: ReactNode;
};

const providersList = providers();

const combineComponents = (...components: FC<fcProp>[]): FC<fcProp> => {
  return components.reduce(
    (AccumulatedComponents, CurrentComponent) => {
      const comp = ({ children }: ComponentProps<FC<fcProp>>): ReactNode => {
        const accComps = (
          <AccumulatedComponents>
            <CurrentComponent>{children}</CurrentComponent>
          </AccumulatedComponents>
        );
        return accComps;
      };
      return comp;
    },
    ({ children }) => <>{children}</>
  );
};

export const AppContextProvider = combineComponents(...providersList);
