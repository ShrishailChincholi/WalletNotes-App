import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const Account = () => {
  const [user, setUser] = useState(null);
    const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return (
      <div className='account-container'>
        <p>No user data Found</p>
      </div>
    );
  }

  return (
    <div className="account-container">
      <h2>My Account</h2>

      <div className="account-info">
        <label>Name</label>
        <p>{user.name}</p>
      </div>

      <div className="account-info">
        <label>Email</label>
        <p>{user.email}</p>
      </div>

      <button className="edit-btn"
      onClick={()=>navigate("/edit-profile")}
      >Edit Profile</button>
    </div>
  )
}

export default Account