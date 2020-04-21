import React, { useContext, useEffect, useReducer, createContext } from "react";
import Navbar from "./Component/Navbar";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Home from "./Component/Screens/Home";
import Profile from "./Component/Screens/Profile"
import Signin from "./Component/Screens/Signin"
import Signup from "./Component/Screens/Signup"
import CreatePost from "./Component/Screens/CreatePost";
import UserProfile from "./Component/Screens/UserProfile";
import SubsUserPost from "./Component/Screens/SubscribesUserPosts"
import { reducer, initialState } from "./store/reducers/userReducers";
import Bottom from "./Component/Bottom";

import "./styles.scss";

export const UserContext = createContext()


const Routing = () => {
  const history = useHistory()
  const {state, dispatch} = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
    }else{
      history.push("/signin")
    }
  },[])
  return(
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/signin">
        <Signin />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/createpost">
        <CreatePost />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route path="/profile/:userid">
        <UserProfile />
      </Route>
      <Route path="/myfollowingpost">
        <SubsUserPost />
      </Route>
    </Switch>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Routing />
        </Switch>
        <Bottom />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
