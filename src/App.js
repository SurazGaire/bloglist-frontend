import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogAuthor, setNewBlogAuthor] = useState("");

  const [newBlogUrl, setNewBlogUrl] = useState("");

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

  const addBlog = (event) => {
    console.log(`New blog is added`);

    event.preventDefault();
    const newObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    };

    const addedBlog = blogService.create(newObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      setNewBlogTitle("");
      setNewBlogAuthor("");
      setNewBlogUrl("");
    });
    if (addedBlog) {
      setErrorMessage("Blog added successfully");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );

  const addBlogForm = () => (
    <div>
      <form onSubmit={addBlog}>
        <h1>Blogs</h1>
        <h3>Add new blog :</h3>
        <div>
          Title :{" "}
          <input
            value={newBlogTitle}
            onChange={(e) => setNewBlogTitle(e.target.value)}
          />
          {"\n"}
        </div>
        {"\n"}

        <div>
          Author :{" "}
          <input
            value={newBlogAuthor}
            onChange={(e) => setNewBlogAuthor(e.target.value)}
          />
          {"\n"}
        </div>
        <div>
          Url :
          <input
            value={newBlogUrl}
            onChange={(e) => setNewBlogUrl(e.target.value)}
          />
          {"\n"}
        </div>
        <div>
          <button type="submit">Save Blog</button>
        </div>
      </form>
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
  );
  return (
    <div>
      <Notification message={errorMesssage} />
      {user === null ? loginForm() : <div>{addBlogForm()}</div>}
    </div>
  );
};

export default App;
