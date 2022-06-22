import { createContext } from "react";
import { User } from "./Models";

interface IOurContext {
  theme: "light" | "dark";
  setTheme: (newTheme: "light" | "dark") => void;
  user: User | null;
  setUser: (newUser: User | null) => void;
  width: number;
}

export const OurContext = createContext<IOurContext>({
  theme: "light",
  setTheme: (_: string) => {},
  user: null,
  setUser: (_: User | null) => {},
  width: 0,
});
