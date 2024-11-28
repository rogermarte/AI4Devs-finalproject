import { ConnectionRepository } from '../repository/connection-repository.interface';
import { Connection } from '../entity/connection';
import { ConnectionStatus } from '../types/connection-status';

export class MockConnectionRepository implements ConnectionRepository {
  private connections: Connection[] = [];

  async save(connection: Connection): Promise<void> {
    this.connections.push(connection);
  }

  async findById(id: string): Promise<Connection | null> {
    return this.connections.find(c => c.id === id) || null;
  }

  async findByUser(userId: string): Promise<Connection[]> {
    return this.connections.filter(c => 
      c.userFromId === userId || c.userToId === userId
    );
  }

  async findByStatus(status: ConnectionStatus): Promise<Connection[]> {
    return this.connections.filter(c => c.status === status);
  }

  async findByUsers(userFromId: string, userToId: string): Promise<Connection | null> {
    return this.connections.find(c => 
      (c.userFromId === userFromId && c.userToId === userToId) ||
      (c.userFromId === userToId && c.userToId === userFromId)
    ) || null;
  }

  async update(connection: Connection): Promise<void> {
    const index = this.connections.findIndex(c => c.id === connection.id);
    if (index !== -1) {
      this.connections[index] = connection;
    }
  }

  async delete(id: string): Promise<void> {
    this.connections = this.connections.filter(c => c.id !== id);
  }
} 