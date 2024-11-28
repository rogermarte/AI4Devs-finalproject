export class PropertyNotFoundError extends Error {
  constructor(id: string) {
    super(`No se encontró la propiedad con id: ${id}`);
    this.name = 'PropertyNotFoundError';
  }
} 