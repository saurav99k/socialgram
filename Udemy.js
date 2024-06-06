import { useState } from "react";
import PostCard from "./components/PostCard";
// import Comment from "./components/Comment";

const { v4: uuidv4 } = require("uuid");
function Comment(props) {
  const [comments, SetComments] = useState([]);
  const [commentTitle, setCommentTitle] = useState("");
  return (
    <>
      <input type="text" value={comments} onChange={props.onChange} />
      <button onClick={props.commentSubmit}>Submit</button>
      <i>{props.myValue}</i>
    </>
  );
}

export default function Udemy() {
  const [title, setTitle] = useState("");
  const [post, setPost] = useState([]);

  function handleSubmit() {
    console.log("clicked");
    const obj = { postId: uuidv4().slice(0, 8), postTitle: title };
    const arr = [...post, obj];
    setPost(arr);
  }
  function handleCommentSubmit(postId) {
    console.log(postId);
  }
  return (
    <>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      {post.map((ele) => (
        <PostCard key={ele.postId}>
          <>
            <h3>{ele.postTitle}</h3>
            <h3>Add a comment</h3>
            <Comment
              value={commentTitle}
              onChange={(e) => setCommentTitle(e.target.value)}
              commentSubmit={() => handleCommentSubmit(ele.postId)}
            />
          </>
        </PostCard>
      ))}
    </>
  );
}
