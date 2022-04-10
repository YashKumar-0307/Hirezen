import logo from "./logo.svg";
// import "./App.css";
import "antd/dist/antd.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Info from "./pages/Info";
import Login from "./pages/Login";
import Post from "./pages/Post";
import Profile from "./pages/Profile";
import { css } from "@emotion/react";
import MoonLoader from "react-spinners/MoonLoader";
import { useSelector } from "react-redux";

function App() {
  const { loader } = useSelector((state) => state.loaderReducer);

  return (
    <div className="App">
      {loader && (
        <div className="sweet-loading text-center">
          <MoonLoader color={"#36D7B7"} />
        </div>
      )}

      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/info" exact element={<Info />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/post" exact element={<Post />} />
          <Route path="/profile" exact element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
