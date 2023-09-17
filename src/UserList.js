import React, { useState } from "react";

function UserList() {
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  const [editMode, setEditMode] = useState([]);

  const fetchUsers = () => {
    fetch("http://localhost:3001/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        // Initialize the editMode array with false values for each user
        setEditMode(Array(data.length).fill(false));
        setShowUsers(true);
      })
      .catch((error) => {
        console.error("Error fetching users: " + error.message);
      });
  };


  const updateUser = (updatedUser) => {
    console.log("Update button clicked");

    // Make a PUT request to update the user on the server
    fetch(`http://localhost:3001/users/${updatedUser.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        // Update the user in the 'users' state
        const updatedUsers = users.map((existingUser) =>
          existingUser.id === updatedUser.id ? updatedUser : existingUser
        );
        setUsers(updatedUsers);
        const updatedEditMode = [...editMode];
        updatedEditMode[users.indexOf(updatedUser)] = false;
        setEditMode(updatedEditMode);
      })
      .catch((error) => {
        console.error("Error updating user: " + error.message);
      });
  };
  const deleteUser = (userId) => {
    // Make a DELETE request to delete the user on the server
    fetch(`http://localhost:3001/users/${userId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        // Remove the deleted user from the 'users' state
        const updatedUsers = users.filter((user) => user.id !== userId);
        setUsers(updatedUsers);
      })
      .catch((error) => {
        console.error("Error deleting user: " + error.message);
      });
  };

  const handleFieldChange = (userId, fieldName, fieldValue) => {
    // Update the field value for the user in the state
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        return { ...user, [fieldName]: fieldValue };
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  return (
    <div className="userdetails-container">
      <h2 className="title">Users List</h2>
      <button onClick={fetchUsers} className="button">
        Show Registered Users
      </button>
      {showUsers && users.length === 0 ? (
        <p className="nousers">No user details found!.</p>
      ) : showUsers ? (
        <div className="user-container">
          {users.map((user, index) => (
            <div key={user.id} className="user-card">
              <h3>User ID: {user.id}</h3>
              {Object.keys(user).map((key) => (
                <div key={key} className="user-detail">
                  {key !== "id" ? (
                    editMode[index] ? (
                      <div>
                        <label>{key}:</label>
                        <input
                          type="text"
                          value={user[key]}
                          onChange={(e) => {
                            handleFieldChange(user.id, key, e.target.value);
                          }}
                        />
                      </div>
                    ) : (
                      <p>
                        {key}: {user[key]}
                      </p>
                    )
                  ) : (
                    <p>
                      {key}: {user[key]}
                    </p>
                  )}
                </div>
              ))}
              {editMode[index] ? (
                <button
                  onClick={() => {
                    console.log("Save button clicked", user);
                    updateUser(user);
                  
                  }}
                  className="save-button"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => {
                    console.log("Edit button clicked", user);
                    const updatedEditMode = [...editMode];
                    updatedEditMode[index] = true;
                    setEditMode(updatedEditMode);
                  }}
                  className="edit-button"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => deleteUser(user.id)}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default UserList;
