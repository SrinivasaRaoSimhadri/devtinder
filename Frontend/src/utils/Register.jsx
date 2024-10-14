import { useState } from "react";
import { BASE_URL } from "../store/constants";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Register = () => {

    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    const register = async () => {
        try {
            const response = await fetch(BASE_URL + "/signup",{
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    emailId,
                    password, 
                    firstName,
                    lastName
                }),
                credentials:"include"
            })
            if(!response.ok) {
                throw new Error("Error in creating account");
            }
            navigate("/login");
        } catch (error) {
            setIsError(true);
            setTimeout(()=>{
                setIsError(false);
            },[3000]);
        }
    }
    return(
        <div className="flex justify-center my-[100px]">
            <div className="card bg-base-300 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="text-center text-2xl">Sign Up</h2>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">First Name</span>
                        </div>
                        <input 
                            type="text"  
                            className="input input-bordered w-full max-w-xs" 
                            value={firstName}
                            onChange={(e)=>setFirstName(e.target.value)}
                        />
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Last Name</span>
                        </div>
                        <input 
                            type="text"  
                            className="input input-bordered w-full max-w-xs" 
                            value={lastName}
                            onChange={(e)=>setLastName(e.target.value)}
                        />
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Email ID</span>
                        </div>
                        <input 
                            type="=shfbsdjb"  
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
                    {
                        isError && <p className="text-center my-3 text-white bg-red-600 p-2 rounded-md">Error in creationg the Account</p>
                    }
                    <div className="card-actions justify-center mt-3">
                        <button 
                            className="btn btn-primary"
                            onClick={register}
                        >
                            Sign Up
                        </button>
                    </div>
                    <div className="flex flex-col items-center mt-4 gap-2">
                        <p>Already having an account?</p>
                        <div className="card-actions justify-center mt-3">
                            <Link className="bg-[#7480FF] text-black px-3 py-3 rounded-md font-semibold" to={"/login"}>Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;