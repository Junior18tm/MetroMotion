import React from "react";
import MbtaAlertsPage from "./components/pages/mbtaAlerts";
// We use Route in order to define the different routes of our application
import { Route, Routes, useParams} from "react-router-dom";


// We import all the components we need in our app
import Navbar from "./components/navbar";
import LandingPage from "./components/pages/landingPage";
import HomePage from "./components/pages/homePage";
import Login from "./components/pages/loginPage";
import Signup from "./components/pages/registerPage";
import PrivateUserProfile from "./components/pages/privateUserProfilePage";
import { createContext, useState, useEffect } from "react";
import getUserInfo from "./utilities/decodeJwt";
import TrainLines from "./components/pages/trainLines";
import AddCommmentPage from "./components/pages/addCommentPage";
import CommentList from "./components/pages/viewCommentsPage";
import SchedulePage from "./components/pages/ScheduleList";
import TrainStops from "./components/pages/TrainStops";
import ScheduledTrains from './components/pages/ScheduledTrains';
import MyFaves from "./components/pages/MyFaves";


export const UserContext = createContext();

const App = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(getUserInfo());
  }, []);

  return (
    <>
      <Navbar />
      <UserContext.Provider value={user}>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/home" element={<HomePage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/mbtaAlerts" element={<MbtaAlertsPage />} />
          <Route path="/privateUserProfile" element={<PrivateUserProfile />} />
          <Route exact path="/trainSchedule" element={<TrainLines />} />
          <Route path="/trainSchedule/:line" element={<TrainStops/>} />
          <Route path="/trainSchedule/:line/:stopId" element={<ScheduledTrains/>} />
          <Route path="/myfavorites" element={<MyFaves/>}/>
          <Route path="/addComment" element={<AddCommmentPage />} />
          <Route path="/viewComments" element={<CommentList />} />
          <Route path="/schedule" element={<SchedulePage />} />
      </Routes>
    

      </UserContext.Provider>
    </>
  );
};



export default App
