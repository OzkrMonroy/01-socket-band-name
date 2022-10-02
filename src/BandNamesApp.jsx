import App from "./App";
import { SocketStore } from "./context/SocketStore";

export const BandNamesApp = () => {
  return (
    <SocketStore>
      <App />
    </SocketStore>
  );
};
