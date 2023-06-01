const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const dataFile = './data.json';
let todoList = [];

// Load todo list from the JSON file
fs.readFile(dataFile, 'utf8', (err, data) => {
  if (!err && data) {
    try {
      todoList = JSON.parse(data);
    } catch (error) {
      console.error('Failed to parse todo list JSON:', error);
    }
  }
});

wss.on('connection', (ws) => {
  // Send the current todo list to the newly connected client
  ws.send(JSON.stringify({ type: 'init', data: todoList }));

  ws.on('message', (message) => {
    const data = JSON.parse(message);

    if (data.type === 'add') {
      const newTodo = { id: Date.now(), text: data.text };
      todoList.push(newTodo);

      // Save the updated todo list to the JSON file
      fs.writeFile(dataFile, JSON.stringify(todoList), (err) => {
        if (err) {
          console.error('Failed to save todo list:', err);
        }
      });

      // Broadcast the updated todo list to all connected clients
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: 'add', data: newTodo }));
        }
      });
    } else if (data.type === 'draw') {
      // Broadcast the drawing data to all connected clients
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: 'draw', data: data.data }));
        }
      });
    }
  });
});

server.listen(3000, () => {
  console.log('Server started on port 3000');
});
