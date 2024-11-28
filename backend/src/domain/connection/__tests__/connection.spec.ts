import { Connection } from '../entity/connection';
import { Message } from '../entity/message';
import { ConnectionStatus } from '../types/connection-status';

describe('Connection Entity', () => {
  const mockValidProps = {
    userFromId: 'user-1',
    userToId: 'user-2',
    status: ConnectionStatus.PENDING
  };

  describe('messages', () => {
    let connection: Connection;
    
    beforeEach(() => {
      connection = Connection.create(mockValidProps);
      connection.accept();
    });

    it('should add message to accepted connection', () => {
      const message = Message.create({
        connectionId: connection.id,
        senderId: mockValidProps.userFromId,
        content: 'Test message'
      });

      connection.addMessage(message);

      const messages = connection.messages;
      expect(messages).toHaveLength(1);
      expect(messages[0].id).toBe(message.id);
      expect(messages[0].content).toBe(message.content);
      expect(messages[0].senderId).toBe(message.senderId);
    });

    it('should get unread messages for user', () => {
      const message1 = Message.create({
        connectionId: connection.id,
        senderId: mockValidProps.userFromId,
        content: 'Message 1'
      });

      const message2 = Message.create({
        connectionId: connection.id,
        senderId: mockValidProps.userToId,
        content: 'Message 2'
      });

      connection.addMessage(message1);
      connection.addMessage(message2);

      const unreadMessages = connection.getUnreadMessages(mockValidProps.userFromId);
      expect(unreadMessages).toHaveLength(1);
      expect(unreadMessages[0].id).toBe(message2.id);
      expect(unreadMessages[0].content).toBe(message2.content);
    });

    it('should throw error when adding message to non-accepted connection', () => {
      const connection = Connection.create(mockValidProps);
      const message = Message.create({
        connectionId: connection.id,
        senderId: mockValidProps.userFromId,
        content: 'Test message'
      });

      expect(() => connection.addMessage(message))
        .toThrow('Solo se pueden enviar mensajes en conexiones aceptadas');
    });
  });

  describe('create', () => {
    it('should create a valid connection', () => {
      const connection = Connection.create(mockValidProps);

      expect(connection).toBeInstanceOf(Connection);
      expect(connection.id).toBeDefined();
      expect(connection.userFromId).toBe(mockValidProps.userFromId);
      expect(connection.userToId).toBe(mockValidProps.userToId);
      expect(connection.status).toBe(ConnectionStatus.PENDING);
      expect(connection.messages).toHaveLength(0);
    });

    it('should throw error when creating connection with same user', () => {
      expect(() => Connection.create({
        ...mockValidProps,
        userToId: mockValidProps.userFromId
      })).toThrow('No se puede crear una conexión con uno mismo');
    });
  });

  describe('status changes', () => {
    it('should accept pending connection', () => {
      const connection = Connection.create(mockValidProps);
      connection.accept();

      expect(connection.status).toBe(ConnectionStatus.ACCEPTED);
    });

    it('should reject pending connection', () => {
      const connection = Connection.create(mockValidProps);
      connection.reject();

      expect(connection.status).toBe(ConnectionStatus.REJECTED);
    });

    it('should block connection', () => {
      const connection = Connection.create(mockValidProps);
      connection.block();

      expect(connection.status).toBe(ConnectionStatus.BLOCKED);
    });

    it('should throw error when accepting non-pending connection', () => {
      const connection = Connection.create({
        ...mockValidProps,
        status: ConnectionStatus.REJECTED
      });

      expect(() => connection.accept())
        .toThrow('Solo se pueden aceptar conexiones pendientes');
    });

    it('should throw error when rejecting non-pending connection', () => {
      const connection = Connection.create({
        ...mockValidProps,
        status: ConnectionStatus.ACCEPTED
      });

      expect(() => connection.reject())
        .toThrow('Solo se pueden rechazar conexiones pendientes');
    });

    it('should throw error when blocking already blocked connection', () => {
      const connection = Connection.create({
        ...mockValidProps,
        status: ConnectionStatus.BLOCKED
      });

      expect(() => connection.block())
        .toThrow('La conexión ya está bloqueada');
    });
  });
}); 