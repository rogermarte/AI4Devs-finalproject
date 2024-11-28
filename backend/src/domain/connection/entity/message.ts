interface MessageProps {
  id: string;
  connectionId: string;
  senderId: string;
  content: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class Message {
  private props: MessageProps;

  private constructor(props: MessageProps) {
    this.validateContent(props.content);
    this.props = props;
  }

  public static create(props: Omit<MessageProps, 'id' | 'read' | 'createdAt' | 'updatedAt'>): Message {
    return new Message({
      ...props,
      id: crypto.randomUUID(),
      read: false,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  private validateContent(content: string): void {
    if (!content.trim()) {
      throw new Error('El contenido del mensaje no puede estar vacío');
    }
    if (content.length > 1000) {
      throw new Error('El contenido del mensaje no puede exceder los 1000 caracteres');
    }
  }

  // Getters
  get id(): string { return this.props.id; }
  get connectionId(): string { return this.props.connectionId; }
  get senderId(): string { return this.props.senderId; }
  get content(): string { return this.props.content; }
  get read(): boolean { return this.props.read; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }

  // Métodos de dominio
  public markAsRead(): void {
    this.props.read = true;
    this.props.updatedAt = new Date();
  }
} 