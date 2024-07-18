import {Link, Outlet} from "react-router-dom";

const Layout = () => {
    return <div className="flex flex-col h-screen">
        <header className="p-2 bg-blue-600 text-white">
            <Link to="/todos/create">New todo</Link>
        </header>
        <main className="grow">
            <Outlet/>
        </main>
        <footer className="p-2">Footer</footer>
    </div>
}

export default Layout;