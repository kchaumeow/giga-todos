import React, {ReactNode, useEffect, useState} from "react";
import ReactDOM from "react-dom/client";
import {RouterProvider} from "react-router-dom";
import {router} from "./router.tsx";
import {createClient, Session} from "@supabase/supabase-js";
import {Auth} from "@supabase/auth-ui-react";
import {ThemeSupa} from "@supabase/auth-ui-shared";
import './input.css';
import {useUserStore} from "./zustand/userStore";
import "react-toastify/dist/ReactToastify.css";

export const supabase = createClient(import.meta.env.VITE_SUPADB_URL, import.meta.env.VITE_SUPADB_API_KEY);

export const App = ({children}: { children: ReactNode }) => {

    const setUser = useUserStore(state => state.setUser);

    const [session, setSession] = useState<Session>();

    useEffect(() => {
        supabase.auth.getSession().then(({data: {session}}) => {
            setSession(session!);
        });

        const {
            data: {subscription},
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session!);
            setUser(session!.user);
        });

        return () => subscription.unsubscribe();
    }, []);

    if (!session) {
        return <div className="max-w-xl px-2 flex flex-col m-auto mt-20">
            <Auth supabaseClient={supabase} appearance={{theme: ThemeSupa}}/>
        </div>;
    } else {
        return children;
    }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <App>
            <RouterProvider router={router}>
            </RouterProvider>
        </App>
    </React.StrictMode>
);