import { randomUUID } from 'crypto';

export class User {
  // ... resto del código ...

  static create(props: UserProps): User {
    return new User({
      ...props,
      id: randomUUID(),
      status: UserStatus.PENDING,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }
}
