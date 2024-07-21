import {Link, Outlet} from "react-router-dom";

export const Layout = () => {
    return <div className="flex flex-col h-screen">
        <nav className="p-2 bg-indigo-600 text-white">
            <Link to="/">TODOS</Link>
        </nav>
        <main className="grow">
            <Outlet/>
        </main>
        <footer className="p-2">Footer</footer>
    </div>
}
