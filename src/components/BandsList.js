import React, { useEffect, useState } from "react";

export const BandsList = ({ bands, onVote }) => {
  const [bandsList, setBandsList] = useState(bands);

  useEffect(() => {
    setBandsList(bands);
  }, [bands]);

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
    console.log(id, name);
  };

  const createRows = () => {
    return bandsList.map((band) => (
      <tr key={band.id}>
        <td>
          <button className="btn btn-primary" onClick={() => onVote(band.id)}>
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
          <button className="btn btn-danger">Delete</button>
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
