import { useState } from "react";

export const AddBand = ({ onCreate }) => {
  const [value, setValue] = useState("");

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (value.trim().length > 0) {
      onCreate(value);
      setValue("");
    }
  };
  return (
    <>
      <h3>Add band</h3>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          className="form-control"
          placeholder="Band name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </form>
    </>
  );
};
