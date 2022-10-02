import { useContext, useState } from "react";
import { SocketContext } from "../context/SocketContext";

export const AddBand = () => {
  const [value, setValue] = useState("");
  const { socket } = useContext(SocketContext);

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (value.trim().length > 0) {
      socket.emit("new-band", { name: value });
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
