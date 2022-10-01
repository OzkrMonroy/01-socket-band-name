import { useEffect, useState } from "react";
import io from "socket.io-client";
import "./App.css";
import { AddBand } from "./components/AddBand";
import { BandsList } from "./components/BandsList";

const connectSocketServer = () => {
  const socket = io.connect("http://localhost:8080", {
    transports: ["websocket"],
  });
  return socket;
};

function App() {
  const [socket] = useState(connectSocketServer());
  const [online, setOnline] = useState(false);
  const [bands, setBands] = useState([]);

  useEffect(() => {
    setOnline(socket.connected);
  }, [socket]);

  useEffect(() => {
    socket.on("connect", () => {
      setOnline(true);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("disconnect", () => {
      setOnline(false);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("current-bands", (bands) => {
      setBands(bands);
    });
  }, [socket]);

  const onVote = (id) => {
    socket.emit("new-vote", { id });
  };

  const onDelete = (id) => {
    socket.emit("delete-band", { id });
  };

  const onChangeName = (id, name) => {
    socket.emit("change-name", { id, name });
  };

  return (
    <div className="container">
      <div className="alert">
        <p>
          Service status:
          {online ? (
            <span className="text-success">Online</span>
          ) : (
            <span className="text-danger">Offline</span>
          )}
        </p>
      </div>
      <h1>BandNames</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <BandsList
            bands={bands}
            onVote={onVote}
            onDelete={onDelete}
            onChangeName={onChangeName}
          />
        </div>
        <div className="col-4">
          <AddBand />
        </div>
      </div>
    </div>
  );
}

export default App;
