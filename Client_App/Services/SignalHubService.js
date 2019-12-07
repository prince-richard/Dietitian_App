import * as signalR from '@aspnet/signalr';
import * as BaseService from './BaseService';

export let signalRHubConnection;
let listeners = {};

export async function connect(token) {
  const options = {
    transport: signalR.HttpTransportType.WebSockets,
    accessTokenFactory: () => token,
  };

  const signalRHub = new signalR.HubConnectionBuilder()
    .withUrl(BaseService.baseURL + '/chathub', options)
    .configureLogging(signalR.LogLevel.Information)
    .build();

  await signalRHub
    .start()
    .catch(err => console.error('signalr start', err.toString()));
  signalRHub.onclose(function() {
    signalRHub
      .start()
      .catch(err => console.error('signalr onclose', err.toString()));
  });
  // singlaton pattern
  signalRHubConnection = signalRHub;
}

export async function addListener(listenerName, fn) {
  // console.log('Add signalr listener.', listenerName, fn);
  listeners[listenerName] = fn;
  signalRHubConnection.on('chatlistener', fn);
}

export async function removeListener(listenerName) {
  listeners[listenerName] &&
    signalRHubConnection.off(listenerName, listeners[listenerName]);
  listeners[listenerName] && delete listenerName[listenerName];
}

export async function disconnect() {
  signalRHubConnection && signalRHubConnection.stop();
}
