import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../store/constants";
import { removeUser } from "../store/userSlice";

const NavBar = () => {
    const user = useSelector((store)=>store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const Logout = async () => {
        try {
            const response = await fetch( BASE_URL + "/logout",{
                method:"POST",
                headers:{
                    "Content-type": "application/json"
                },
                credentials: "include"
            })
            dispatch(removeUser())
            return navigate("/login");
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="navbar bg-base-300">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl">DevTinder</Link>
            </div>
            <div>
                {
                    user && <div className="dropdown dropdown-end mx-5">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img alt="Tailwind CSS Navbar component" src={user.photoUrl} />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li>
                                <Link to="/profile" className="justify-between">
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <Link to="/connections" className="justify-between">
                                    Connections
                                </Link>
                            </li>
                            <li>
                                <Link to="/requests" className="justify-between">
                                    Requests
                                </Link>
                            </li>
                            <li 
                                onClick={Logout}
                                className="cursor-pointer px-3">
                                Logout
                            </li>
                        </ul>
                    </div>
                }
            </div>
        </div>
    )
}

export default NavBar;