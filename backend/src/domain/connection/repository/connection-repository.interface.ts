import { Connection } from '../entity/connection';
import { ConnectionStatus } from '../types/connection-status';

export interface ConnectionRepository {
  save(connection: Connection): Promise<void>;
  findById(id: string): Promise<Connection | null>;
  findByUser(userId: string): Promise<Connection[]>;
  findByStatus(status: ConnectionStatus): Promise<Connection[]>;
  findByUsers(userFromId: string, userToId: string): Promise<Connection | null>;
  update(connection: Connection): Promise<void>;
  delete(id: string): Promise<void>;
} 