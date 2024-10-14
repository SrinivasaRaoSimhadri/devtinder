import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { BASE_URL } from "../store/constants";
import { useDispatch, useSelector } from "react-redux";
import {addUser} from "../store/userSlice"
import { useEffect } from "react";

const Body = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((store)=>store.user);

    const getUser = async ()=> {
        try {
            const response = await fetch(BASE_URL + "/profile/view",{
                credentials: "include"
            });
            if(response.status === 400) {
                return navigate("/login");
            }
            const user = await response.json();
            dispatch(addUser(user));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        if(!user) {
            getUser();
        }
    },[]);

    return (
        <div>
            <NavBar/>
            <Outlet/>
            <Footer/>
        </div>
    )
}

export default Body;