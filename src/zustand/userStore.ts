import {create} from "zustand";
import {User} from "@supabase/supabase-js";

interface UserState {
    user: User | null;
    setUser: (user: User) => void
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    setUser: (user: User) => set(() => ({
        user: user,
    }))
}));