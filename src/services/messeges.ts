/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { WSTransport } from '../core';
import store from '../core/store';
import { WSTransportEvents } from '../core/WSTransport';
import { wsURL } from '../utils/constants';
import { TMessage } from '../utils/types';

// eslint-disable-next-line prefer-const
let sockets: Map<number | null | undefined, WSTransport> = new Map();

export const fetchOldMessages = (id?: number | null) => {
  const socket = sockets.get(id);
  if (!socket) {
    throw new Error(`Ошибка, чат ${id} не подключен`);
  }
  socket.send({ type: 'get old', content: '0' });
};

const onMessage = (messages: TMessage | TMessage[], id?: number | null) => {
  if (!Array.isArray(messages) && messages.type !== 'message') {
    return;
  }
  let messagesToAdd: TMessage[] = [];
  if (Array.isArray(messages)) {
    messagesToAdd = messages.reverse();
  } else {
    messagesToAdd.push(messages);
  }
  const currentMessages = store.getState().currentChat?.messages || []; // Получаем текущие сообщения из состояния
  const filteredMessagesToAdd = messagesToAdd.filter((msg) => msg.chat_id === id); // Фильтруем сообщения по идентификатору чата
  const updatedMessages = [...currentMessages, ...filteredMessagesToAdd]; // Объединяем текущие сообщения с новыми
  store.set('currentChat.messages', updatedMessages); // Сохраняем обновленные сообщения в состоянии
};

const onClose = (id?: number | null) => {
  sockets.delete(id);
  console.log('WebSocket closed');
};

const subscribe = (transport: WSTransport, id?: number | null) => {
  transport.on(WSTransportEvents.Message, (message: any) => onMessage(message, id));
  transport.on(WSTransportEvents.Close, () => onClose(id));
};

export const chatConnect = async (id?: number | null, token?: number | null) => {
  // Очищаем старые сообщения перед подключением к новому чату
  store.set('currentChat.messages', []);

  const userId = store.getState().currentUser?.data?.id;
  const wsTransport = new WSTransport(`${wsURL}${userId}/${id}/${token}`);
  sockets.set(id, wsTransport);
  await wsTransport.connect();
  subscribe(wsTransport, id);
  fetchOldMessages(id);
  console.log('WebSocket connected');
};

export const sendMessage = (message: string, id?: number | null) => {
  const socket = sockets.get(id);
  if (!socket) {
    throw new Error(`Ошибка, чат ${id} не подключен`);
  }

  // Создаем новое сообщение
  const newMessage = {
    chat_id: id,
    content: message,
    user_id: store.getState().currentUser?.data?.id,
    time: new Date().toISOString(), // Устанавливаем текущее время
    type: 'message',
  };

  socket.send({
    type: 'message',
    content: message,
  });
  // Обновляем состояние, добавляя новое сообщение
  const currentMessages = store.getState().currentChat?.messages || [];
  store.set('currentChat.messages', [...currentMessages, newMessage]);
};

export const closeAll = () => {
  Array.from(sockets.values()).forEach((socket) => socket.close());
  console.log('All WebSocket closed');
};
