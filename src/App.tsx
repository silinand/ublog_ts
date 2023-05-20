import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Signup from './components/Signup';
import Login from './components/Login';
import NoPage from './components/NoPage';

import MyNavigate from './components/MyNavigate';

import PostArray from './components/posts/PostArray';
import PostEditor from './components/posts/PostEditor';
import PostViewer from './components/posts/PostViewer';

import UserPage from './components/users/UserPage';
import UserArray from './components/users/UserArray';
import UserSettings from './components/users/UserSettings';

import AuthPanel from './components/AuthPanel';

import logo from './logo.svg';
import './App.css';
import UserManager from './core/userManager';
import User from './core/models/User';

export default function App() {
  const [user, setUser] = useState(User.empty())

  var userManager = new UserManager(() => setUser(User.empty()));

  return (
    <div className="myBody">
      <div className="header">
        <a className="title" href="/">ublog</a>
        <p>A website created by me</p>
      </div>

      <div className="navbar">
        <a href="/">Posts</a>
        <a href="/subs">Subscriptions</a>
        <AuthPanel userManager={userManager} />
      </div>

      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login userManager={userManager} />} />
            <Route path="/signup" element={<Signup userManager={userManager}/>} />
            <Route path="/user" >
              <Route index element={<MyNavigate />} />
              <Route path=":id" element={<UserPage id={user.id} />} />
              <Route path=":id/following" element={<UserArray type={"following"} />} />
              <Route path=":id/followers" element={<UserArray type={"follower"} />} />
            </Route>
            <Route path="/settings" element={<UserSettings id={user.id} />} />
            <Route path="/subs" element={<PostArray type={"sub"} />} />
            <Route path="/post/:id" element={<PostViewer />} />
            <Route path="/edit-post/:id" element={<PostEditor isEdit={true} />} />
            <Route path="/create-post" element={<PostEditor />} />
            <Route path="/" element={<PostArray />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      </div>

      <div className="footer">
        <h2>footer</h2>
      </div>
    </div>
  );
}
