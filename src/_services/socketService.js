import io from "socket.io-client";
import { apiConstants } from "../_constants/apiConstants";
export const socketService = {
  connect,
};
//window.location.hostname
function connect() {
  return new Promise((resolve, reject) => {
  /*  const io = require("socket.io")(httpServer, {
      cors: {
        origin: "https://192.168.1.8:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["query"],
        credentials: true
      }
    });*/
    var socket = io("https://192.168.1.8:3000", {
       query: { token: JSON.parse(localStorage.getItem("user")).token },
    });

    socket.on('connection', function (client) {
      client.send("hello")
      console.log("hello", client)
    })

    socket.on("connect", () => {
      resolve(socket);
    });

    socket.on('connect', function() { 
      console.log('connected');
   });
  
   socket.on('message', function(msg){
      console.log(msg);
   });
  
   socket.on('disconnect', function() {
      console.log('disconnected');
   });
  
   socket.on('error', function (e) {
      console.log('System', e ? e : 'A unknown error occurred');
   });

  });
}
