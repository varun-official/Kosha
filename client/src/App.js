/** @format */

import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/Home/HomePage";
import Navbar from "./components/shared/Navbar/Navbar";
import Activate from "./pages/Activate/Activate";
import Authenticate from "./pages/Authenticate/Authenticate";
import Rooms from "./pages/Rooms/Rooms";
import { useSelector } from "react-redux";
import { useLoadingWithRefresh } from "./hooks/useLoadingWithRefresh";
import Loader from "./components/shared/Loader/Loader";
import Room from "./pages/Room/Room";

// const isAuth = false;
// const user = {
//   activated: false,
// };

function App() {
  const { loading } = useLoadingWithRefresh();
  return loading ? (
    <Loader message="Loading, please wait.." />
  ) : (
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

        <Route
          path="/room/:id"
          element={
            <ProtectedRoute>
              <Room />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

const GuestRoute = ({ children }) => {
  const { isAuth } = useSelector((state) => state.auth);

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
  const { isAuth, user } = useSelector((state) => state.auth);

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
  const { isAuth, user } = useSelector((state) => state.auth);

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
