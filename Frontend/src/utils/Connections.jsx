import { useEffect } from "react";
import { BASE_URL } from "../store/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../store/connectionsSlice";

const Connections = () =>{

    const connections = useSelector((store) => store.connections);
    const dispatch = useDispatch();

    const fectchConnections = async () => {
        try {
            const response = await fetch(BASE_URL + "/user/connections",{
                method: "GET",
                credentials: "include"
            })
            const connections = await response.json();
            dispatch(addConnections(connections));
            console.log(connections);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        fectchConnections();
    },[]);

    if(!connections || connections.length === 0) {
        return (
            <div className="flex justify-center my-4">
                <h1 className="font-bold text-xl">No connections found</h1>
            </div>
        )
    } 
    
    return (
        <div className="mb-16 mt-3">
            <h1 className="font-bold text-xl mb-6 text-center">Connections</h1>
            <div className="flex flex-col items-center">
                {
                    connections.map((connection) => {
                        const {firstName, lastName, photoUrl, age, gender, about } = connection;
                        return (
                            <div className="mb-4 bg-base-300 max-w-md min-w-[400px] flex gap-4 rounded-md p-3" key={connection._id}>
                                <div>
                                    <img className="rounded-full" src={photoUrl} height = {100} width={100} alt="feed image" />
                                </div>
                                <div className="flex flex-col justify-between">
                                    <h1>{firstName + " " + lastName }</h1>
                                    <h1>{about}</h1>
                                    {
                                        age && gender && <h1>{age +" " + gender}</h1>
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default Connections;