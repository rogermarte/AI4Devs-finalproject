import { Message } from '../entity/message';

describe('Message Entity', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const mockValidProps = {
    connectionId: 'mock-connection-id',
    senderId: 'mock-sender-id',
    content: 'Hello, I am interested in your property'
  };

  describe('create', () => {
    it('should create a valid message', () => {
      const message = Message.create(mockValidProps);

      expect(message).toBeInstanceOf(Message);
      expect(message.id).toBeDefined();
      expect(message.connectionId).toBe(mockValidProps.connectionId);
      expect(message.senderId).toBe(mockValidProps.senderId);
      expect(message.content).toBe(mockValidProps.content);
      expect(message.read).toBe(false);
    });

    it('should throw error for empty content', () => {
      expect(() => Message.create({ ...mockValidProps, content: '' }))
        .toThrow('El contenido del mensaje no puede estar vacío');
      
      expect(() => Message.create({ ...mockValidProps, content: '   ' }))
        .toThrow('El contenido del mensaje no puede estar vacío');
    });

    it('should throw error for content exceeding maximum length', () => {
      const longContent = 'a'.repeat(1001);
      expect(() => Message.create({ ...mockValidProps, content: longContent }))
        .toThrow('El contenido del mensaje no puede exceder los 1000 caracteres');
    });
  });

  describe('markAsRead', () => {
    it('should mark message as read', () => {
      const message = Message.create(mockValidProps);
      const initialUpdatedAt = message.updatedAt;

      jest.advanceTimersByTime(1000);
      message.markAsRead();

      expect(message.read).toBe(true);
      expect(message.updatedAt.getTime()).toBeGreaterThan(initialUpdatedAt.getTime());
    });
  });
}); 