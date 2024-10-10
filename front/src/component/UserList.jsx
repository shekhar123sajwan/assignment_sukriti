import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState(null);
  const fetchUser = async () => {
    try {
      const res = await fetch("http://localhost:3000/users");
      const { data, message } = await res.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleDeleteUser = async (event) => {
    event.preventDefault();
    if (!confirm("Are you sure you want to delete this user?")) {
      return;
    }

    const res = await fetch(`http://localhost:3000/users/`, {
      method: "DELETE",
      body: JSON.stringify({
        id: event.target.id,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const { data, message } = await res.json();

    setMessage(message);
    fetchUser();

    setTimeout(() => {
      setMessage(null);
    }, 2000);
  };

  return (
    <div className="overflow-x-auto" style={{ height: "600px" }}>
      {message && <div className="alert alert-success">{message}</div>}

      <table className="table table-xs table-pin-rows table-pin-cols">
        {/* head */}
        <thead>
          <tr>
            <th>S. No</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>About</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users ? (
            users.map((user, index) => {
              return (
                <tr key={index}>
                  <th>
                    <label>{index + 1}</label>
                  </th>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.about}</td>
                  <th>
                    <Link
                      to={`user/edit/${user._id}`}
                      role="button"
                      className="btn mx-2"
                    >
                      Edit
                    </Link>
                    <button
                      id={user._id}
                      className="btn m-3"
                      onClick={handleDeleteUser}
                    >
                      Delete
                    </button>
                  </th>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={5} className="text-center">
                No user found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
