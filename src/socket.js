import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:4000';
const socket = io({
  path: process.env.REACT_APP_SERVER_URL,
  reconnectionAttempts: 5
});

socket.on('disconnect', (reason) => {
  if (reason === "io server disconnect") {
    // the disconnection was initiated by the server, you need to reconnect manually
    socket.connect();
  }
});

export {socket};