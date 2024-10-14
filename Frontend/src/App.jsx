import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Provider} from "react-redux";
import Body from "./utils/Body";
import Login from "./utils/Login";
import Profile from "./utils/Profile";
import Feed from "./utils/Feed";
import appStore from "./store/appStore";
import Connections from "./utils/Connections";
import Requests from "./utils/Requests";
import Register from "./utils/Register";



const App = () => {
    return (
        <>
            <Provider store={appStore}>
                <BrowserRouter basename="/">
                    <Routes>
                        <Route path="/" exact element={<Body/>}>
                            <Route path="/" exact element={<Feed/>}/> 
                            <Route path="/login" exact element={<Login/>}/>
                            <Route path="/profile" exact element={<Profile/>}/>
                            <Route path="/connections" exact element={<Connections/>}/>
                            <Route path="/requests" exact element={<Requests/>}/>
                            <Route path="/register" exact element={<Register/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </Provider>
        </>
    )
}
export default App;