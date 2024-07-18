import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
// import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import NewTodo from "./pages/NewTodo";
import Calendar from "./pages/Calendar";

export const router = createBrowserRouter([
    {
        element: <Layout />,
        path: "/",
        children: [
            {
                element: <Home />,
                index: true,
            },
            {
                element: <Calendar />,
                path: "/calendar",
            },
            {
                element: <NewTodo />,
                path: "/todos/create",
            },
            {
                element: <div>Page not found</div>,
                path: "*",
            },
        ],
    },
]);