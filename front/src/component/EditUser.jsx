import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [about, setAbout] = useState("");
  const [success, setSuccess] = useState("");
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const id = useParams().userId;
  const handleSubmit = async () => {
    setError(null);
    try {
      const json = await fetch("http://localhost:3000/users", {
        method: "PUT",
        body: JSON.stringify({
          firstName,
          lastName,
          about,
          id,
          password,
        }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        mode: "cors",
      });
      const { data, message } = await json.json();

      if (data?.length === 0 || data == null) {
        setError(message);
        return;
      }

      setSuccess("User updated successfully");
      setTimeout(() => {
        setSuccess(null);
        navigate("/");
      }, 2000);
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
  };

  const fetchUser = async () => {
    try {
      const res = await fetch(`http://localhost:3000/users/${id}`);
      const { data, message } = await res.json();
      const { email, firstName, lastName, about } = data;
      setUser(data);
      setFirstName(firstName);
      setemail(email);
      setLastName(lastName);
      setAbout(about);
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
        <h2 className="card-title text-center text-xl mx-auto">Edit User</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <label className="input input-bordered flex items-center gap-2 my-3">
            First Name
            <input
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
              defaultValue={user.firstName}
              value={firstName}
              className="grow"
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 my-3">
            Last Name
            <input
              type="text"
              onChange={(e) => setLastName(e.target.value)}
              defaultValue={user.lastName}
              value={lastName}
              className="grow"
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 my-3">
            Email
            <input
              type="text"
              defaultValue={user.email}
              value={email}
              className="grow"
              disabled={"disabled"}
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 my-3">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="grow"
            />
          </label>

          <textarea
            className="textarea textarea-bordered textarea-xs w-full max-w-xs"
            onChange={(e) => setAbout(e.target.value)}
            defaultValue={user.about}
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
              Update User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
