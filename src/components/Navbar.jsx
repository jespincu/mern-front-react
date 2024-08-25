import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
      <Link to={isAuthenticated ? "/tasks" : "/"}>
        <h1 className="text-2xl font-bold">Task Manager</h1>
      </Link>

      <ul className="flex gap-x-2 items-center">
        {isAuthenticated ? (
          <>
            <li className="text-white hidden md:inline">
              Welcome {user?.username}{" "}
            </li>
            <li>
              <Link
                to="/add-task"
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-sm text-sm md:text-base"
              >
                Add Task
              </Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={() => logout()}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-sm text-sm md:text-base"
              >
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="bg-indigo-500 px-4 py-1 rounded-sm">
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="bg-indigo-500 px-4 py-1 rounded-sm"
              >
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
