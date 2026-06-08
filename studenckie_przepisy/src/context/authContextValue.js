import { createContext } from "react";

const AuthContext = createContext({
  user: null,
  loading: true,
  logout: () => {},
});

export default AuthContext;
