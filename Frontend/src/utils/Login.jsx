import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../store/constants";
import { Link } from "react-router-dom";

const Login = () => {

    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch(BASE_URL + "/login",{
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({emailId, password}),
                credentials: "include"
            })
            const user = await response.json();
            dispatch(addUser(user));
            navigate("/");
        } catch(error) {
            setError(true);
        }
    }

    return(
        <div className="flex justify-center mt-[100px]">
            <div className="card bg-base-300 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Login</h2>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Email ID</span>
                        </div>
                        <input 
                            type="text"  
                            className="input input-bordered w-full max-w-xs" 
                            value={emailId}
                            onChange={(e)=>setEmailId(e.target.value)}
                        />
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Password</span>
                        </div>
                        <input 
                            type="password" 
                            className="input input-bordered w-full max-w-xs" 
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                    </label>
                    <p>
                        {
                            error && <h1 className="bg-red-900  text-center text-white py-3">Login failed</h1>
                        }
                    </p>
                    <div className="card-actions justify-center mt-3 font-semibold">
                        <button 
                            className="btn btn-primary"
                            onClick={handleLogin}
                        >
                            Login
                        </button>
                    </div>
                    <div className="card-actions justify-center mt-6">
                        <div className="flex flex-col  justify-center items-center gap-4">
                            <p>Don't have an account yet?</p>
                            <Link className="bg-[#7480FF] text-black px-3 py-3 rounded-md font-semibold w-fit" to={"/register"}>Sign Up</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;