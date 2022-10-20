/** @format */

import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/Home/HomePage";
import Navbar from "./components/shared/Navbar/Navbar";
import Activate from "./pages/Activate/Activate";
import Authenticate from "./pages/Authenticate/Authenticate";
import Rooms from "./pages/Rooms/Rooms";

const isAuth = true;
const user = {
  activated: false,
};

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <GuestRoute>
              <HomePage />
            </GuestRoute>
          }
        />

        <Route
          path="/authenticate"
          element={
            <GuestRoute>
              <Authenticate />
            </GuestRoute>
          }
        ></Route>

        <Route
          path="/activate"
          element={
            <SemiProtectedRoute>
              <Activate />
            </SemiProtectedRoute>
          }
        ></Route>

        <Route
          path="/rooms"
          element={
            <ProtectedRoute>
              <Rooms />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

const GuestRoute = ({ children }) => {
  return isAuth ? (
    <Navigate
      to={{
        pathname: "/rooms",
      }}
    />
  ) : (
    children
  );
};

const SemiProtectedRoute = ({ children }) => {
  return !isAuth ? (
    <Navigate
      to={{
        pathname: "/",
      }}
    />
  ) : isAuth && !user.activated ? (
    children
  ) : (
    <Navigate
      to={{
        pathname: "/rooms",
      }}
    />
  );
};

const ProtectedRoute = ({ children }) => {
  return !isAuth ? (
    <Navigate
      to={{
        pathname: "/",
      }}
    />
  ) : isAuth && !user.activated ? (
    <Navigate
      to={{
        pathname: "/activate",
      }}
    />
  ) : (
    children
  );
};

export default App;
