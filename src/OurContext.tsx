import { createContext } from "react";

export const OurContext = createContext({
  theme: "dark",
  setTheme: (newTheme: string) => {},
});
