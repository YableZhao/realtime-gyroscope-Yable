import WebSocket from 'isomorphic-ws';

export const ws = new WebSocket('ws:localhost:3000');

ws.onerror = console.error;

ws.onopen = function open() {
	ws.send(JSON.stringify({message: 'message from client'}));
};

ws.onmessage = function incoming(event) {
	console.log('received message: %s', event.data);
}