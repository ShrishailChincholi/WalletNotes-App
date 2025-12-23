import React, { useEffect, useState } from 'react';

const Account = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("User");
        if (storedUser) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setUser(JSON.parse(storedUser));
        }
    }, []);

    if (!user){
        return(
            <div className='account-container'>
                <p>No user data Found</p>
            </div>
        );
    }

    return(
         <div className="account-container">
      <div className="account-card">
        <h2>My Account</h2>

        <div className="account-info">
          <label>Name</label>
          <p>{user.name}</p>
        </div>

        <div className="account-info">
          <label>Email</label>
          <p>{user.email}</p>
        </div>

        <button className="edit-btn">Edit Profile</button>
      </div>
    </div>
    )
}

export default Account