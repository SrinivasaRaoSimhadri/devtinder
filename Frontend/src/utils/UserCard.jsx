import { useDispatch } from "react-redux";
import { BASE_URL } from "../store/constants";
import { removeFeed } from "../store/feedSlice";

const UserCard = ( { user } ) => {
    const dispatch = useDispatch();
    const handleSendRequest = async (status, userId) => {
        try {
            const response = await fetch(BASE_URL + "/request/send/" + status + "/"  + userId , {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                credentials: "include"
            })
            dispatch(removeFeed(userId));
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="card bg-base-300 w-96 shadow-xl border">
            <figure>
                <img
                    className="p-6"
                    src={user.photoUrl}
                    alt="user" 
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{user.firstName + " " + user.lastName}</h2>
                <p>{user.about}</p>
                <div className="flex items-center justify-between text-white yext-bold">
                    <button
                        onClick={()=>handleSendRequest("ignored", user._id)} 
                        className="bg-base-100 px-3 py-2 rounded-md hover:bg-slate-700 duration-300"
                    >
                        Ignore
                    </button>
                    <button 
                        onClick={()=>handleSendRequest("intrested", user._id)} 
                        className="bg-base-100 px-3 py-2 rounded-md hover:bg-slate-700 duration-300"
                    >
                        Intrested
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UserCard;