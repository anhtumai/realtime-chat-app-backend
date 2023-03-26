import { WebSocketServer, WebSocket } from "ws";
import { isLoginData, isMessageData } from "./validators";

const PORT = Number(process.env.PORT) || 8080;

const wss = new WebSocketServer({ port: PORT });

function parseJsonString(text: string): object {
  try {
    return JSON.parse(text);
  } catch (err) {
    return {};
  }
}

function broadcastToAllClients(stringToSend: string) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(stringToSend);
    }
  });
}

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  ws.on("message", function message(data) {
    const dataObject = parseJsonString(data.toString());
    if (isLoginData(dataObject)) {
      // User login data
      const { username, location } = dataObject.login;
      const stringToSend = JSON.stringify({
        message: {
          text: `${username} has connected from ${location}`,
          isSystemMessage: true,
        },
      });
      broadcastToAllClients(stringToSend);
    } else if (isMessageData(dataObject)) {
      // User message data
      const stringToSend = JSON.stringify(dataObject);
      broadcastToAllClients(stringToSend);
    }
  });
});
