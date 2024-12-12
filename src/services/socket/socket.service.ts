import { BASE_URL } from "@services/axios";
import { io, Socket } from "socket.io-client";




class SocketService {
  socket?: Socket

  setupSocketConnection() {
    this.socket = io(BASE_URL, {
      // if you choose websocket you will not be able to do long polling
      transports: ['websocket'],
      secure: true
    })

    this.socketConnectionEvents()
  }

  private socketConnectionEvents() {
    if (this.socket) {
      this.socket.on('connect', () => {
        console.log('connected to socket.io');
      });

      this.socket.on('disconnect', () => {
        console.log('disconnected from socket.io');
      });

      this.socket.on('connect_error', (error) => {
        console.log(`Error: ${error}`);
        this.socket?.connect();
      });
    }
  }
}


export const socketService = new SocketService();
