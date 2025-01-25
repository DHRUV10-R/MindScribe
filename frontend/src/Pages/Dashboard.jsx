import React, { useState } from "react";
import { useAuth } from "G:/TYCSS6/S6blogwebsite/Blogwebsite/frontend/src/Context/AutoProvider.jsx";
import Sidebar from "G:/TYCSS6/S6blogwebsite/Blogwebsite/frontend/src/dashboard/Sidebar";
import MyBlogs from "G:/TYCSS6/S6blogwebsite/Blogwebsite/frontend/src/Dashboard/MyBlogs";
import CreateBlog from "G:/TYCSS6/S6blogwebsite/Blogwebsite/frontend/src/Dashboard/CreateBlog";
import UpdateBlog from "G:/TYCSS6/S6blogwebsite/Blogwebsite/frontend/src/Dashboard/UpdateBlog";
import MyProfile from "G:/TYCSS6/S6blogwebsite/Blogwebsite/frontend/src/dashboard/MyProfile";


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