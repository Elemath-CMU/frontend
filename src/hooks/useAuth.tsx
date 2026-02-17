import { createContext, useContext, type Dispatch, type SetStateAction } from "react";
import type { User } from "../pages/Login";

export type AuthContextType = {
    currentUser: User | null;
    setCurrentUser: Dispatch<SetStateAction<User | null>>;
    nextEpisodeIndex: () => void;
    nextInteractionIndex: () => void;
};

export const AuthContext = createContext<AuthContextType>({
    currentUser: null,
    setCurrentUser: () => { },
    nextEpisodeIndex: () => { },
    nextInteractionIndex: () => { },
});

function useAuth() {
  return useContext(AuthContext);
}

export default useAuth;
