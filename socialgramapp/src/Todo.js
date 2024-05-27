import { useState } from "react";
const { v4: uuidv4 } = require("uuid");

// Generate a UUID

export default function Todo() {
  const [text, setText] = useState("");
  const [array, setArray] = useState([]);
  const [pinnedArray, setPinnedArray] = useState([]);
  //const [Key, setKey] = useState("");

  function onButtonSubmit() {
    setArray((prevArray) => [
      ...prevArray,
      {
        id: uuidv4(),
        text: text,
      },
    ]);
    //setArray
    //console.log(array);
  }

  function handlePinnedArrayChange(elementId) {
    const extractedElement = pinnedArray.find((ele) => ele.id === elementId);
    const newArr = pinnedArray.filter((ele) => ele.id !== elementId);
    console.log(extractedElement);
    setPinnedArray(newArr);
    setArray((prev) => [extractedElement, ...prev]);
  }

  function handleArrayChange(elementId) {
    const extractedElement = array.find((ele) => ele.id === elementId);
    const newArr = array.filter((ele) => ele.id !== elementId);
    console.log(extractedElement);
    setArray(newArr);
    setPinnedArray((prev) => [...prev, extractedElement]);
  }

  function handleArrayDoubleClick(elementId) {
    const newArr = array.filter((ele) => ele.id !== elementId);
    setArray(newArr);
  }
  return (
    <div>
      <h2>Enter your Todo Task</h2>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={onButtonSubmit}>Submit</button>
      <div style={{ float: "left" }}>
        <h3>All List</h3>
        <ul>
          {array.map((ele) => (
            <li
              // onClick={() => handleArrayChange(ele.id)}
              onDoubleClick={() => handleArrayDoubleClick(ele.id)}
              key={ele.id}
            >
              {ele.text}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ float: "left" }}>
        <h3>Pinned Items List</h3>
        <ul>
          {pinnedArray.map((ele) => (
            <li onClick={() => handlePinnedArrayChange(ele.id)} key={ele.id}>
              {ele.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
