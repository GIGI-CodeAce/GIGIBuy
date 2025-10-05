import { createContext, useState, useEffect, ReactNode } from "react";
import { API_BASE } from "./api";

interface User {
  username: string;
  error?: string;
  createdAt: string;
}

interface UserContextType {
  userInfo: User | null
  setUserInfo: (user: User | null) => void;
  loading: boolean
}

export const UserContext = createContext<UserContextType>({
  userInfo: null,
  setUserInfo: () => {},
  loading: true,
});

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [userInfo, setUserInfo] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/profile`, {
          method: "GET",
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setUserInfo(data?.username ? data : null);
        } else {
          setUserInfo(null);
        }
      } catch {
        setUserInfo(null);
      } finally {
        setLoading(false);
      }
    })()
  }, [])

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo, loading }}>
      {children}
    </UserContext.Provider>
  );
}
