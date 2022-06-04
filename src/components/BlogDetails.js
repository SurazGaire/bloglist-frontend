import blogService from "../services/blogs";

const BlogDetails = (props) => {
  const removeBLog = async (blog_id) => {
    if (
      window.confirm(`Do you really want to delete the blog ${props.title}?`)
    ) {
      const response = await blogService.remove(blog_id);
      console.log(response);
    }
  };

  return (
    <div>
      <div>Blog Title : {props.title}</div>
      <div>Author : {props.author}</div>
      <div>Url : {props.url}</div>
      <div>Likes : {props.likes}</div>
      <div>blog_id : {props.blog_id}</div>
      <button
        onClick={() => {
          removeBLog(props.blog_id);
        }}
      >
        Remove blog
      </button>
    </div>
  );
};

export default BlogDetails;
