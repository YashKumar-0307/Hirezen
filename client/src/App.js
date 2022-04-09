import logo from "./logo.svg";
// import "./App.css";
import "antd/dist/antd.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Info from "./pages/Info";
import Login from "./pages/Login";
import Post from "./pages/Post";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/info" exact element={<Info/>} />
          <Route path="/login" exact element={<Login/>} />
          <Route path="/post" exact element={<Post/>} />
          <Route path="/profile" exact element={<Profile/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
