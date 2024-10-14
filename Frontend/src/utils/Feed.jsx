import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../store/constants";
import { useEffect } from "react";
import { addFeed } from "../store/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {

    const dispatch = useDispatch();
    const feed = useSelector(store => store.feed);

    const getFeed = async () =>{
        if(feed) return;
        try {
            const response = await fetch(BASE_URL + "/feed",{
                credentials: "include"
            });
            const feed = await response.json();
            dispatch(addFeed(feed));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getFeed();
    },[]);

    if(!feed || feed.length === 0) return (
        <div className="text-center font-bold mt-6">
            No feed found
        </div>
    )
    return (
        feed && <div className="flex items-center justify-center mt-5">
            {
                <UserCard user = {feed[0]} />
            }
        </div>
    )
}

export default Feed;