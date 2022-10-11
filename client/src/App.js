import io from "socket.io-client"
import {useEffect, useState} from "react";

function App() {
  const socket = io.connect("http://localhost:3001")

  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState("");
  const [room, setRoom] = useState("");

  const sendMessage = () => {
    socket.emit("send_message", {message, room})
  }

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room)
    }
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setReceivedMessage(data.message)
      console.log("data", data)
    })
  }, [socket])

  return (
    <div className="App">
      <input onChange={(e) => {setRoom(e.target.value)}} placeholder={"room number"}/>
      <button onClick={joinRoom}>join room</button>
      <br/>
      <input onChange={(e) => {
        setMessage(e.target.value)
      }} placeholder={"message..."}/>
      <button onClick={sendMessage}>send a message</button>
      <h1>Message: {receivedMessage}</h1>
    </div>
  );
}

export default App;
