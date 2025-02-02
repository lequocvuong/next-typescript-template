import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getItem, removeItem } from 'utils/localStorage';

const AuthContext = React.createContext(
  {} as {
    // user: User;
    authenticate: (newToken: string) => Promise<void>;
    logout: ({ redirectLocation: string }) => void;
    isLoading: boolean;
    isAuthenticated: boolean;
    token: string;
  }
);

export const AuthProvider = ({ children }) => {
  // const [user, setUser] = useState<User>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  // const isAuthenticated = !!user;
  const isAuthenticated = false;


  const logout = ({ redirectLocation }) => {
    removeItem("Token");
    // unauthenticateAPI();
    // setUser(null);
    setIsLoading(false);
    console.log("Redirecting");
    router.push(redirectLocation || "/login");
  };

  const authenticate = async (token) => {
    setIsLoading(true);
    // authenticateAPI(token);
    // try {
    //   // const { data: user } = await routes.user.me.request();
    //   // setUser(user);
    //   Cookies.set("token", token);
    // } catch (error) {
    //   console.log({ error });
    //   unauthenticateAPI();
    //   setUser(null);
    //   Cookies.remove("token");
    // }
    setIsLoading(false);
  };

  useEffect(() => {
    const token = getItem("Token");
    if (!token) return;
    authenticate(token);
  }, []);

  useEffect(() => {
    const Component = children.type;

    // If it doesn't require auth, everything's good.
    if (!Component.requiresAuth) return;

    // If we're already authenticated, everything's good.
    if (isAuthenticated) return;

    // If we don't have a token in the cookies, logout
    const token = getItem("Token");
    if (!token) {
      return logout({ redirectLocation: Component.redirectUnauthenticatedTo });
    }

    // If we're not loading give the try to authenticate with the given token.
    if (!isLoading) {
      authenticate(token);
    }
  }, [isLoading, isAuthenticated, children.type.requiresAuth]);

  return (
    <AuthContext.Provider
      value={{
        // user,
        authenticate,
        logout,
        isLoading,
        isAuthenticated: false,
        token: getItem("Token"),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
