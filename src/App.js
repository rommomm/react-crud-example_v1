import React, { useCallback, useEffect, useState } from "react";

function App() {
  const getAllusers = [{ id: 1, name: "John" }];

  const [allusers, setAllUsers] = useState(getAllusers || []);
  const [userName, setUserName] = useState("");
  const [updateUser, setUpdateUser] = useState(null);
  const [updateUsername, setUpdateUsername] = useState("");


  const addUser = () => {
    if (userName && userName.length > 3) {
      setAllUsers([{ id: allusers.length + 1, name: userName }, ...allusers]);
      setUserName("");
    }
  };

  const deleteUser = (id) => {
    const newUsers = allusers.filter((user) => {
      return user.id !== id;
    });
    setAllUsers(newUsers);
  };

  const editUser = (id) => {
    const updateUser = { id, name: updateUsername };
    const updateUsers = allusers.map((user) => {
      return user.id === id ? updateUser : user;
    });
    setAllUsers(updateUsers);
    setUpdateUser(false);
  };

  const updatedUser = (id, name) => {
    setUpdateUsername(name);
    setUpdateUser(id);
    if (updateUser === id) {
      setUpdateUser(null);
    }
  };

  const handleChangeUpdateUsername = (e) => {
    e.preventDefault();
    setUpdateUsername(e.target.value);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button onClick={() => addUser()}>Add users</button>
      </div>
      <div>
        {allusers.map((user) => {
          const isUpdate = updateUser === user.id;
          return (
            <div key={user.id}>
              <div style={{ display: "flex" }}>
                {isUpdate ? (
                  <input
                    type="text"
                    defaultValue={user.name}
                    onChange={(e) => handleChangeUpdateUsername(e)}
                  />
                ) : (
                  <span>{user.name}</span>
                )}

                <button onClick={() => deleteUser(user.id)}>Deleted</button>
                {isUpdate && (
                  <button onClick={() => editUser(user.id)}>Save</button>
                )}
                <button onClick={() => updatedUser(user.id, user.name)}>
                  {!isUpdate ? "Edit" : "Close"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
