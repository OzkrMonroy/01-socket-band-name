import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContext";

export const BandsList = ({ onDelete, onChangeName }) => {
  const [bandsList, setBandsList] = useState([]);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.on("current-bands", (bands) => {
      setBandsList(bands);
    });

    return () => socket.off("current-bands");
  }, [socket]);

  const changeName = (id, newName) => {
    const newBandList = bandsList.map((band) => {
      if (band.id === id) {
        band.name = newName;
      }
      return band;
    });
    setBandsList(newBandList);
  };

  const lostFocus = (id, name) => {
    socket.emit("change-name", { id, name });
  };

  const createRows = () => {
    return bandsList.map((band) => (
      <tr key={band.id}>
        <td>
          <button
            className="btn btn-primary"
            onClick={() => socket.emit("new-vote", { id: band.id })}
          >
            +1
          </button>
        </td>
        <td>
          <input
            type="text"
            className="form-control"
            value={band.name}
            onChange={(e) => changeName(band.id, e.target.value)}
            onBlur={() => lostFocus(band.id, band.name)}
          />
        </td>
        <td>
          <h3>{band.votes}</h3>
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => socket.emit("delete-band", { id: band.id })}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <table className="table table-stripped">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Votes</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{createRows()}</tbody>
      </table>
    </>
  );
};
