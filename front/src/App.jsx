import { useState } from "react";
import "./App.css";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./component/Body";
import Home from "./component/Home";
import SignUp from "./component/SignUp";
import Login from "./component/Login";
import EditUser from "./component/EditUser";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/user/edit/:userId" element={<EditUser />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
