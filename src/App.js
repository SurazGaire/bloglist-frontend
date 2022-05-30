import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";

import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMesssage, setErrorMessage] = useState(null);

  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      const loggedUser = window.localStorage.getItem("loggedNoteappUser");
      if (loggedUser) {
        let user = JSON.parse(loggedUser);
        let userId = user.id;
        const loggedUserBlog = blogs.filter((blog) => blog.user.id === userId);
        setBlogs(loggedUserBlog);
      }
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const Notification = ({ message }) => {
    if (message === null) {
      return null;
    }

    return <div className="error">{message}</div>;
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      console.log(`Username and password is filled`);
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      console.log(user);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Username/password donot match");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const addBlog = (blogObject) => {
    // noteFormRef.current.toggleVisibility();
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
    });
  };
  // if (addBlog) {
  //   setErrorMessage("Blog added successfully");
  //   setTimeout(() => {
  //     setErrorMessage(null);
  //   }, 5000);
  // }

  return (
    <div>
      <Notification message={errorMesssage} />
      {user === null ? (
        <Togglable buttonLabel="Login">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={(event) => {
              setUsername(event.target.value);
            }}
            handlePasswordChange={(event) => setPassword(event.target.value)}
            handleSubmit={handleLogin}
          ></LoginForm>
        </Togglable>
      ) : (
        <div>
          <Togglable buttonLabel="Create new Form">
            <BlogForm createBlog={addBlog} />
          </Togglable>
          <h2>{user.name} Logged In</h2>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
          <button
            onClick={() => {
              window.localStorage.removeItem("loggedNoteappUser");
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
