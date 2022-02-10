import { createContext } from "react";
import { User } from "./Models";

interface IOurContext {
  theme: string;
  setTheme: (newTheme: string) => void;
  user: User | null;
  setUser: (newUser: User | null) => void;
}

export const OurContext = createContext<IOurContext>({
  theme: "dark",
  setTheme: (newTheme: string) => {},
  user: null,
  setUser: (newUser: User | null) => {},
});
