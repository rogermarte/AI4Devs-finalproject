import { ConnectionStatus } from '../types/connection-status';
import { Message } from './message';

interface ConnectionProps {
  id: string;
  userFromId: string;
  userToId: string;
  status: ConnectionStatus;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export class Connection {
  private props: ConnectionProps;

  private constructor(props: ConnectionProps) {
    this.validateUsers(props.userFromId, props.userToId);
    this.props = props;
  }

  public static create(props: Omit<ConnectionProps, 'id' | 'messages' | 'createdAt' | 'updatedAt'>): Connection {
    return new Connection({
      ...props,
      id: crypto.randomUUID(),
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  private validateUsers(fromId: string, toId: string): void {
    if (fromId === toId) {
      throw new Error('No se puede crear una conexión con uno mismo');
    }
  }

  // Getters
  get id(): string { return this.props.id; }
  get userFromId(): string { return this.props.userFromId; }
  get userToId(): string { return this.props.userToId; }
  get status(): ConnectionStatus { return this.props.status; }
  get messages(): Message[] { 
    return this.props.messages.slice();
  }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }

  // Métodos de dominio
  public accept(): void {
    if (this.props.status !== ConnectionStatus.PENDING) {
      throw new Error('Solo se pueden aceptar conexiones pendientes');
    }
    this.props.status = ConnectionStatus.ACCEPTED;
    this.props.updatedAt = new Date();
  }

  public reject(): void {
    if (this.props.status !== ConnectionStatus.PENDING) {
      throw new Error('Solo se pueden rechazar conexiones pendientes');
    }
    this.props.status = ConnectionStatus.REJECTED;
    this.props.updatedAt = new Date();
  }

  public block(): void {
    if (this.props.status === ConnectionStatus.BLOCKED) {
      throw new Error('La conexión ya está bloqueada');
    }
    this.props.status = ConnectionStatus.BLOCKED;
    this.props.updatedAt = new Date();
  }

  public addMessage(message: Message): void {
    if (this.props.status !== ConnectionStatus.ACCEPTED) {
      throw new Error('Solo se pueden enviar mensajes en conexiones aceptadas');
    }
    if (message.connectionId !== this.id) {
      throw new Error('El mensaje no pertenece a esta conexión');
    }
    this.props.messages.push(message);
    this.props.updatedAt = new Date();
  }

  public getUnreadMessages(userId: string): Message[] {
    return this.props.messages
      .filter(m => m.senderId !== userId && !m.read)
      .slice();
  }
} 