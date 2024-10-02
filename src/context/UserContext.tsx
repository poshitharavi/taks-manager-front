import React, { createContext, useState, ReactNode } from "react";

interface User {
  name: string;
  email: string;
  token: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
