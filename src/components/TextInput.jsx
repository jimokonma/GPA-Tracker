import React from "react";

function TextInput(props) {
  return (
    <form>
      <input type="text" name={props.name} />
      <select name={props.name}>
        <option value=""></option>
      </select>
      <select name={props.name}>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
        <option value="F">F</option>
      </select>
      <div className="btn-box">
        {inputList.length !== 1 && (
          <button onClick={() => removeFiled(i)}>Remove</button>
        )}
        {inputList.length - 1 === i && (
          <button onClick={addTextFiled}>Add</button>
        )}
      </div>
    </form>
  );
}
export default TextInput;
