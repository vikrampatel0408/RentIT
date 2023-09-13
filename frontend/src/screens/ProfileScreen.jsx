import React from "react";
import { useParams } from "react-router-dom";
const ProfileScreen = async () => {
  const { _id } = useParams();
  const data = await fetch("http://localhost:6969/api/users/profile", {
    method: "POST",
    body: JSON.stringify({ _id }),
  });
  return <div>{userData.name}</div>;
};

export default ProfileScreen;
