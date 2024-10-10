import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [about, setAbout] = useState("");
  const [success, setSuccess] = useState("");
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError(null);
    try {
      const json = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        body: JSON.stringify({ firstName, lastName, email, password, about }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        mode: "cors",
      });
      const { data, message } = await json.json();

      if (data?.length === 0 || data == null) {
        setError(message);
        return;
      }

      setSuccess("User created successfully");
      setTimeout(() => {
        setSuccess(null);
        navigate("/");
      }, 2000);
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
  };
  return (
    <div className="card bg-base-300 w-96 shadow-xl mx-auto">
      <div className="card-body">
        <h2 className="card-title text-center text-xl mx-auto">Sign Up</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <label className="input input-bordered flex items-center gap-2 my-3">
            First Name
            <input
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              className="grow"
              placeholder="Jon"
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 my-3">
            Last Name
            <input
              type="text"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              className="grow"
              placeholder="Doe"
            />
          </label>

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

          <textarea
            className="textarea textarea-bordered textarea-xs w-full max-w-xs"
            placeholder="About me"
            onChange={(e) => setAbout(e.target.value)}
            value={about}
          ></textarea>

          {error && (
            <div className="alert alert-error">
              <span className="text bg-red-400">* {error}</span>
            </div>
          )}
          {success && (
            <div className="alert alert-success">
              <span className="text bg-green-400">* {success}</span>
            </div>
          )}
          <div className="card-actions justify-end my-2">
            <button className="btn btn-primary" onClick={handleSubmit}>
              Sign Up
            </button>
          </div>
          <div className="card-actions justify-start my-2">
            Already have an account?
            <Link to={"/login"}>Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
