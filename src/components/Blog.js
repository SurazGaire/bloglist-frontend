import BlogToggle from "./BlogToggle";
import BlogDetails from "./BlogDetails";

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div style={blogStyle}>
      <div className="blog">
        {blog.title} by {blog.author}
        <BlogToggle buttonLabel="View">
          <BlogDetails
            title={blog.title}
            author={blog.author}
            url={blog.url}
            likes={blog.likes}
            blog_id={blog.id}
          ></BlogDetails>
        </BlogToggle>
      </div>
    </div>
  );
};

export default Blog;
