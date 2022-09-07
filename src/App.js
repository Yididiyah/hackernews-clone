import { useState } from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import CreatePost from "./components/CreatePost";
import EditPost from "./components/EditPost";
import Header from "./components/Header";
import Login from "./components/Login";
import PostList from "./components/PostList";
import PostPage from "./components/PostPage";
import Reply from "./components/Reply";
import User from "./components/User";

function App() {
  return (
    <div>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/list/:listType" element={<PostList />} />
          <Route path="/submit" element={<CreatePost />} />
          <Route path="/edit/:postId" element={<EditPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<User />} />
          <Route path="/item/:postId" element={<PostPage />} />
          <Route path="/reply" element={<Reply />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
