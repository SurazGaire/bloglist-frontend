const BlogDetails = (props) => {
  return (
    <div>
      <div>Blog Title : {props.title}</div>
      <div>Author : {props.author}</div>
      <div>Url : {props.url}</div>
      <div>Likes : {props.likes}</div>
    </div>
  );
};

export default BlogDetails;
