import { useSocket } from "../hooks/useSocket";
import { SocketContext } from "./SocketContext";

export const SocketStore = ({ children }) => {
  const { socket, online } = useSocket("http://localhost:8080");

  return (
    <SocketContext.Provider
      value={{
        socket,
        online,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
