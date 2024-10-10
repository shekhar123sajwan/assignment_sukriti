import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const handleSubmit = async () => {
    try {
      const json = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        mode: "cors",
      });
      const { data, message } = await json.json();

      if (data?.length === 0) {
        setError(message);
        return;
      }
      dispatch(addUser(data));
      navigate("/");
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
  };

  const fetchUser = async () => {
    const cookie = getCookie("token");
    if (cookie === undefined) {
      return false;
    }

    try {
      const res = await fetch("http://localhost:3000/users/profile", {
        method: "GET",
        credentials: "include",
        mode: "cors",
      });
      const { data, message } = await res.json();
      dispatch(addUser(data));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div className="card bg-base-300 w-96 shadow-xl mx-auto">
      <div className="card-body">
        <h2 className="card-title text-center text-xl mx-auto">Login</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <label className="input input-bordered flex items-center gap-2 my-3">
            Email
            <input
              type="text"
              onChange={(e) => setemail(e.target.value)}
              value={email}
              className="grow"
              placeholder="email@site.com"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 my-3">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="grow"
              placeholder="*********"
            />
          </label>
          {error && (
            <div className="alert alert-error">
              <span className="text bg-red-400">* {error}</span>
            </div>
          )}
          <div className="card-actions justify-end my-2">
            <button className="btn btn-primary" onClick={handleSubmit}>
              Login
            </button>
          </div>
          <div className="card-actions justify-start my-2">
            Create new account?
            <Link to={"/signup"}>Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
