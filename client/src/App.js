import { useEffect } from "react";
import "antd/dist/antd.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Info from "./pages/Info";
import Login from "./pages/Login";
import Post from "./pages/Post";
import Posted from "./pages/Posted";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";
import FadeLoader from "react-spinners/FadeLoader";
import { useDispatch, useSelector } from "react-redux";
import Register from "./pages/Register";
import { getAllJobs } from "./redux/actions/jobsAction";
import EditJob from "./pages/EditJob";
import AppliedJobs from "./pages/AppliedJobs";
import { getAllUsers } from "./redux/actions/userActions";
import UserInfo from "./pages/UserInfo";

function App() {
  const { loader } = useSelector((state) => state.loaderReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllJobs());
    dispatch(getAllUsers());
  }, []);

  return (
    <div className="App">
      {loader && (
        <div className="sweet-loading text-center">
          <FadeLoader color={"#36D7B7"} />
        </div>
      )}

      <BrowserRouter>
        <Routes>
          <Route path="/login" exact element={<Login />} />
          <Route
            path="/"
            exact
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/jobs/:id"
            exact
            element={
              <ProtectedRoute>
                <Info />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editjob/:id"
            exact
            element={
              <ProtectedRoute>
                <EditJob />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/:id"
            exact
            element={
              <ProtectedRoute>
                <UserInfo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/post"
            exact
            element={
              <ProtectedRoute>
                <Post />
              </ProtectedRoute>
            }
          />
          <Route
            path="/posted"
            exact
            element={
              <ProtectedRoute>
                <Posted />
              </ProtectedRoute>
            }
          />
          <Route
            path="/appliedjob"
            exact
            element={
              <ProtectedRoute>
                <AppliedJobs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            exact
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contact"
            exact
            element={
              <ProtectedRoute>
                <Contact />
              </ProtectedRoute>
            }
          />
          <Route path="/register" exact element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

export function ProtectedRoute({ children }) {
  const user = localStorage.getItem("user");

  if (!user) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
}
