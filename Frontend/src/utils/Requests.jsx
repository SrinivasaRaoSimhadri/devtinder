import { useEffect } from "react";
import { BASE_URL } from "../store/constants"
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../store/requestSlice";

const Requests = () => {
    const dispatch = useDispatch();
    let requests = useSelector((store) => store.requests);

    const reviewRequest = async (status, _id) => {
        console.log(status, _id);
        try {
            const respose = await fetch(BASE_URL + "/request/review/" + status +"/" + _id,{
                method: "POST",
                headers: {
                    "Content-type":"application/json",
                },
                credentials: "include"
            })
            if(!respose.ok) {
                throw new Error("failed");
            }
            const actionRequest = await respose.json();
            dispatch(removeRequest(actionRequest.connectionStatus._id))
        } catch (error) {
            console.log(error);
        }
    }

    const getRequests = async () =>{
        try {
            const reponse = await fetch(BASE_URL + "/user/requests/received",{
                credentials: "include"
            })
            const requests = await reponse.json();
            dispatch(addRequests(requests));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=> {
        getRequests();
    },[]);

    if(!requests || requests.length === 0) {
        return (
            <div className="flex justify-center my-4">
                <h1 className="font-bold text-xl">No requests found</h1>
            </div>
        )
    } 
    
    return (
        <div className="mb-16 mt-3">
            <h1 className="font-bold text-xl mb-6 text-center">Requests</h1>
            <div className="flex flex-col items-center">
                {
                    requests.map((request) => {
                        const {firstName, lastName, photoUrl, age, gender, about } = request.fromUserId;
                        return (
                            <div className="mb-4 bg-base-300 flex justify-between items-center p-5 rounded-md min-w-[400px] max-w-[400px]" key={request._id}>
                                <div>
                                    <img className="rounded-full" src={photoUrl} height = {100} width={100} alt="requests" />
                                </div>
                                <div className="flex flex-col">
                                    <h1>{firstName + " " + lastName }</h1>
                                    <h1>{about}</h1>
                                    {
                                        age && gender && <h1>{age +" " + gender}</h1>
                                    }
                                </div>
                                <div className="flex flex-col gap-3">
                                    <button 
                                        className="bg-green-900 text-white p-2 rounded-md hover:bg-green-600 duration-300"
                                        onClick={()=>reviewRequest("accepted", request._id)}
                                    >Accept</button>
                                    <button 
                                        className="bg-rose-900 text-white p-2 rounded-md hover:bg-rose-600 duration-300"
                                        onClick={()=>reviewRequest("rejected", request._id)}
                                    >Reject</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Requests;