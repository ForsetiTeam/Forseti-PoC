import io             from 'socket.io-client';

export default class socketAPI {
  constructor() {
    this.socket = null;
    this.reconnect = true;
    this.on = this.on.bind(this);
    this.emit = this.emit.bind(this);
    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);
  }

  connect() {
    const port = typeof window.NODE_SOCKET_PORT !== 'undefined'
      ? `:${window.NODE_SOCKET_PORT}`
      : '';

    this.socket = io.connect(`//${window.location.hostname}${port}`, { secure: true });
    return new Promise((resolve, reject) => {
      this.socket.on('connect', () => resolve());
      this.socket.on('connect_error', (error) => reject(error));
    });
  }

  disconnect() {
    this.reconnect = false;
    return new Promise((resolve) => {
      if (!this.socket) return resolve();
      if (!this.socket.connected) return resolve();
      this.socket.on('disconnect', () => {
        this.socket = null;
        resolve();
      });
      this.socket.close();
    });
  }

  emit(event, data) {
    return new Promise((resolve, reject) => {
      if (!this.socket) return reject('No socket connection.');
      this.socket.emit(event, data);
      resolve();
      // Если когда-нибудь нужна будет обработка ответа
      // return this.socket.emit(event, data, (response) => {
      //   console.log(response);
      //   if (response.error) {
      //     console.error(response.error);
      //     return reject(response.error);
      //   }
      //
      //   return resolve();
      // });
    });
  }

  on(event, fun) {
    return new Promise((resolve, reject) => {
      if (!this.socket) return reject('No socket connection.');

      this.socket.on(event, fun);
      resolve();
    });
  }
}
