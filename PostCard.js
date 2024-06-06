export default function PostCard(props) {
  return (
    <div
      style={{
        width: "200px",
        height: "200px",
        border: "1px solid black",
        padding: "10px",
        margin: "10px",
        float: "left",
      }}
    >
      {props.children}
    </div>
  );
}
