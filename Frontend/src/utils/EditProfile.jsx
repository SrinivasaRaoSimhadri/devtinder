import { useState } from "react";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../store/constants";
import { Link } from "react-router-dom";
import { addUser } from "../store/userSlice";

const EditProfile = ( {user} ) => {
    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName);
    const [age, SetAge] =  useState(user.age)
    const [gender, setGender] = useState(user.gender);
    const [about, setAbout] = useState(user.about)
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl)
    const [savingflag, setSavingFlag] = useState(false);
    const dispatch = useDispatch();

    const saveProfile = async () => {
        try {
            const response = await fetch(BASE_URL + "/profile/edit", {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json"
                },
                body:JSON.stringify({
                    firstName,
                    lastName,
                    age,
                    gender,
                    about,
                    photoUrl
                }),
                credentials: "include"
            })
            if(!response.ok) {
                throw new Error("coudnt edit");
            }
            const editedUser = await response.json(); 
            setSavingFlag(true);
            dispatch(addUser(editedUser));
            setTimeout(()=>{
                setSavingFlag(false);
            },[3000]);
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <div className="flex justify-center gap-6">
            <div className="flex justify-center mb-[100px] mt-5">
                <div className="card bg-base-300 w-96 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Edit Profile</h2>
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
                                <span className="label-text">Age</span>
                            </div>
                            <input 
                                type="text" 
                                className="input input-bordered w-full max-w-xs" 
                                value={age}
                                onChange={(e)=>SetAge(e.target.value)}
                            />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Gender</span>
                            </div>
                            <input 
                                type="text" 
                                className="input input-bordered w-full max-w-xs" 
                                value={gender}
                                onChange={(e)=>setGender(e.target.value)}
                            />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">About</span>
                            </div>
                            <input 
                                type="text" 
                                className="input input-bordered w-full max-w-xs" 
                                value={about}
                                onChange={(e)=>setAbout(e.target.value)}
                            />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">photoUrl</span>
                            </div>
                            <input 
                                type="text" 
                                className="input input-bordered w-full max-w-xs" 
                                value={photoUrl}
                                onChange={(e)=>setPhotoUrl(e.target.value)}
                            />
                        </label>
                        {
                            savingflag && <div className="flex flex-col gap-3">
                                <h1 className="p-3 bg-green-600 text-center text-white rounded-md mt-3">Profile Edited Successfully</h1>
                            </div>
                        }
                        <div className="card-actions justify-center mt-3">
                            <button 
                                className="btn btn-primary"
                                onClick={saveProfile}
                            >
                                Save Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-24">
                <UserCard user = {{firstName, lastName, age, gender, about, photoUrl}}/>
            </div>
        </div>
    )
}

export default EditProfile;