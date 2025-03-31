import React, {
  useState,
  createContext,
  Dispatch,
  useContext,
  SetStateAction,
} from "react";

type UserContextProviderProps = {
  children: React.ReactNode;
};

const UserContext = createContext<any | undefined>(undefined);

const UserContextProvider = (children: UserContextProviderProps) => {
  const [user, setUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: '',
    dob: "",
    gender: '',
    login:false
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children?.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

export const useUser = () => {
  const user = useContext(UserContext);

  return user;
};
