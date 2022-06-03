import { useState } from "react";

const BlogToggle = (props) => {
  const [showDetails, setShowDetails] = useState(false);

  const hideWhenBlogsVisible = { display: showDetails ? "none" : "" };
  const showWhenBlogsVisible = { display: showDetails ? "" : "none" };

  const toggleVisibility = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div>
      <div style={hideWhenBlogsVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenBlogsVisible}>
        {props.children}
        <button onClick={toggleVisibility}>hide</button>
      </div>
    </div>
  );
};

export default BlogToggle;
