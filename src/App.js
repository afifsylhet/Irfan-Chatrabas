import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { loadUserDetails } from "./features/slice/userSlice";
import { useEffect } from "react";

import Headers from "./components/Headers/Headers";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import MyProfile from "./components/MyProfile/MyProfile";
import UpdateProfile from "./components/UpdateProfile/UpdateProfile";
import UpdatePassword from "./components/UpdatePassword/UpdatePassword";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import Register from "./components/Register/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import Borders from "./components/Dashboard/Borders";
import BorderDetails from "./components/Dashboard/BorderDetails";
import AddBorder from "./components/Dashboard/AddBorder";
import Search from "./components/Dashboard/Search";
import EditBorder from "./components/Dashboard/EditBorder";
import Incomes from "./components/Dashboard/Incomes";
import EditIncome from "./components/Dashboard/EditIncome";
import AddExpence from "./components/Dashboard/AddExpence";
import Expences from "./components/Dashboard/Expences";
import EditExpence from "./components/Dashboard/EditExpence";
import AddRoom from "./components/Dashboard/AddRoom";
import Rooms from "./components/Dashboard/Rooms";
import EditRoom from "./components/Dashboard/EditRoom";

function App() {

  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);


  useEffect(() => {
      dispatch(loadUserDetails());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Headers user={user}  />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/account" element={<MyProfile />} />
        <Route path="/me/update" element={<UpdateProfile />} />
        <Route path="/password/update" element={<UpdatePassword />} />
        <Route path="/password/forget" element={<ForgetPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/borders" element={<Borders/>} />
        <Route path="/borders/:keyword" element={<Borders />} />
        <Route path="/border/:id" element={<BorderDetails />} />
        <Route path="/addBorder" element={<AddBorder />} />
        <Route path="/search" element={<Search />} />
        <Route path="/borderEdit/:edit" element={<EditBorder />} />
        <Route path="/incomes" element={<Incomes />} />
        <Route path="/income/update/:incomeId" element={<EditIncome />} />
        <Route path="/addExpence" element={< AddExpence/>} />
        <Route path="/Expences" element={<Expences/>} />
        <Route path="/Expence/update/:expenceId" element={<EditExpence/>} />
        <Route path="/addRoom" element={<AddRoom />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/room/update/:roomId" element={<EditRoom/>} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
