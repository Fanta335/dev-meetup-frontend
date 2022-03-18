import { useAuth0 } from "@auth0/auth0-react";
import React, { VFC } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import RequireAuth from "./components/auth/requireAuth";
import Home from "./pages/Home";
import NavBar from "./components/Navbar";
import Profile from "./pages/Profile";
import ExternalApi from "./pages/externalApi";

const App: VFC = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>}></Route>
        <Route path='/external-api' element={<ExternalApi />}></Route>
      </Routes>
    </div>
  );
};

export default App;
