import { createContext } from "react";
import { Teacher } from "./Models";

interface state {
  theme: string;
  setTheme: any;
  user?: Teacher; // only teachers can create accounts, so this _should_ be fine?
}

export const defaultValues: state = {
  theme: "dark",
  setTheme: () => {},
  user: undefined,
};

export const OurContext = createContext(defaultValues);
