import { useContext } from "react";
import "./App.css";
import { AddBand } from "./components/AddBand";
import { BandsList } from "./components/BandsList";
import { SocketContext } from "./context/SocketContext";

function App() {
  const { online } = useContext(SocketContext);

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
          <BandsList />
        </div>
        <div className="col-4">
          <AddBand />
        </div>
      </div>
    </div>
  );
}

export default App;
