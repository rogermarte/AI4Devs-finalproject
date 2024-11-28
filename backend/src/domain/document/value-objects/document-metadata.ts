interface DocumentMetadataProps {
  fileName: string;
  mimeType: string;
  size: number;
  hash: string;
}

export class DocumentMetadata {
  private props: DocumentMetadataProps;

  private constructor(props: DocumentMetadataProps) {
    this.validateFileName(props.fileName);
    this.validateMimeType(props.mimeType);
    this.validateSize(props.size);
    this.validateHash(props.hash);
    this.props = props;
  }

  public static create(props: DocumentMetadataProps): DocumentMetadata {
    return new DocumentMetadata(props);
  }

  private validateFileName(fileName: string): void {
    if (!fileName.trim()) {
      throw new Error('El nombre del archivo no puede estar vacío');
    }
    if (fileName.length > 255) {
      throw new Error('El nombre del archivo es demasiado largo');
    }
  }

  private validateMimeType(mimeType: string): void {
    const validMimeTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    if (!validMimeTypes.includes(mimeType)) {
      throw new Error('Tipo de archivo no permitido');
    }
  }

  private validateSize(size: number): void {
    const MAX_SIZE = 10 * 1024 * 1024; // 10MB
    if (size <= 0) {
      throw new Error('El tamaño del archivo debe ser positivo');
    }
    if (size > MAX_SIZE) {
      throw new Error('El archivo excede el tamaño máximo permitido');
    }
  }

  private validateHash(hash: string): void {
    if (!hash.trim()) {
      throw new Error('El hash del archivo no puede estar vacío');
    }
    // Validar formato SHA-256
    const sha256Regex = /^[a-f0-9]{64}$/i;
    if (!sha256Regex.test(hash)) {
      throw new Error('Formato de hash inválido');
    }
  }

  get fileName(): string { return this.props.fileName; }
  get mimeType(): string { return this.props.mimeType; }
  get size(): number { return this.props.size; }
  get hash(): string { return this.props.hash; }
} 