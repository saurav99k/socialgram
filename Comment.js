export default function Comment(props) {
  return (
    <>
      <input type="text" value={props.value} onChange={props.onChange} />
      <button onClick={props.commentSubmit}>Submit</button>
      <i>{props.myValue}</i>
    </>
  );
}
