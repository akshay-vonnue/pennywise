import { createContext, useContext } from "react";

type AuthContextType = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuthContext() {
  const user = useContext(AuthContext);
  if (user === undefined) {
    throw new Error("Auth context cannot function without a provided context");
  }
  return user;
}
