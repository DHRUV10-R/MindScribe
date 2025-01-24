import React, { useState } from "react";
import { useAuth } from "../Context/AuthProvider";
import Sidebar from "../dashboard/Sidebar";
import MyProfile from "../dashboard/MyProfile";
import MyBlogs from "../Dashboard/MyBlogs";
import CreateBlog from "../Dashboard/CreateBlog";
import UpdateBlog from "../Dashboard/UpdateBlog";


import { Navigate } from "react-router-dom";
function Dashboard() {
  const { profile, isAuthenticated } = useAuth();
  const [component, setComponent] = useState("My Blogs");
  console.log(profile);
  console.log(isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return (
    <div>
      <div>
        <Sidebar component={component} setComponent={setComponent} />
        {component === "My Profile" ? (
          <MyProfile />
        ) : component === "Create Blog" ? (
          <CreateBlog />
        ) : component === "Update Blog" ? (
          <UpdateBlog />
        ) : (
          <MyBlogs />
        )}
      </div>
    </div>
  );
}

export default Dashboard;