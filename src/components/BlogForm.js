import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogAuthor, setNewBlogAuthor] = useState("");
  const [newBlogUrl, setNewBlogUrl] = useState("");

  const handleTitleChange = (event) => {
    setNewBlogTitle(event.target.value);
  };
  const handleAuthorChange = (event) => {
    setNewBlogAuthor(event.target.value);
  };
  const handleUrlChange = (event) => {
    setNewBlogUrl(event.target.value);
  };

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    });

    setNewBlogTitle("");
    setNewBlogAuthor("");
    setNewBlogUrl("");
  };

  return (
    <div>
      <h2>Create a new Blog</h2>
      <form onSubmit={addBlog}>
        <input value={newBlogTitle} onChange={handleTitleChange} />
        <input value={newBlogAuthor} onChange={handleAuthorChange} />
        <input value={newBlogUrl} onChange={handleUrlChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default BlogForm;
