import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleUpload = async () => {
    if (!image) {
      alert("Select an image");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("image", image);

      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:6060/api/auth/upload-profile",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await res.json();

      console.log("UPLOAD RESPONSE =", data);

      if (data.success) {
        const updatedUser = {
          ...user,
          profileImage: data.profileImage,
        };

        setUser(updatedUser);

        localStorage.setItem(
          "user",
          JSON.stringify(updatedUser)
        );

        alert("Profile Image Updated Successfully");
      }

    } catch (error) {
      console.log(error);
      alert("Upload Failed");
    }
  };

  if (!user) {
    return (
      <div className="account-container">
        <p>No user data Found</p>
      </div>
    );
  }

  return (
    <div className="account-container">

      <h2>My Account</h2>

      <div className="profile-section">

        <img
          src={
            user.profileImage
              ? `http://localhost:6060${user.profileImage}`
              : "https://via.placeholder.com/140"
          }
          alt="Profile"
          className="profile-img"
        />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button
          className="upload-btn"
          onClick={handleUpload}
        >
          Upload Image
        </button>

      </div>

      <div className="account-info">
        <label>Name</label>
        <p>{user.name}</p>
      </div>

      <div className="account-info">
        <label>Email</label>
        <p>{user.email}</p>
      </div>

      <button
        className="edit-btn"
        onClick={() => navigate("/edit-profile")}
      >
        Edit Profile
      </button>

    </div>
  );
};

export default Account;