import { DocumentType, DocumentStatus } from '../types/document-type';
import { DocumentMetadata } from '../value-objects/document-metadata';

interface DocumentProps {
  id: string;
  type: DocumentType;
  metadata: DocumentMetadata;
  status: DocumentStatus;
  uploaderId: string;
  verifierId?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  verifiedAt?: Date;
}

export class Document {
  private props: DocumentProps;

  private constructor(props: DocumentProps) {
    this.validateType(props.type);
    this.validateStatus(props.status);
    this.validateVerification(props.status, props.verifierId, props.verifiedAt);
    this.props = props;
  }

  public static create(props: Omit<DocumentProps, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Document {
    return new Document({
      ...props,
      id: crypto.randomUUID(),
      status: DocumentStatus.PENDING,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  private validateType(type: DocumentType): void {
    if (!Object.values(DocumentType).includes(type)) {
      throw new Error('Tipo de documento inválido');
    }
  }

  private validateStatus(status: DocumentStatus): void {
    if (!Object.values(DocumentStatus).includes(status)) {
      throw new Error('Estado de documento inválido');
    }
  }

  private validateVerification(status: DocumentStatus, verifierId?: string, verifiedAt?: Date): void {
    if (status === DocumentStatus.VERIFIED) {
      if (!verifierId) {
        throw new Error('Se requiere un verificador para documentos verificados');
      }
      if (!verifiedAt) {
        throw new Error('Se requiere fecha de verificación para documentos verificados');
      }
    }
  }

  // Getters
  get id(): string { return this.props.id; }
  get type(): DocumentType { return this.props.type; }
  get metadata(): DocumentMetadata { return this.props.metadata; }
  get status(): DocumentStatus { return this.props.status; }
  get uploaderId(): string { return this.props.uploaderId; }
  get verifierId(): string | undefined { return this.props.verifierId; }
  get notes(): string | undefined { return this.props.notes; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get verifiedAt(): Date | undefined { return this.props.verifiedAt; }

  // Métodos de dominio
  public verify(verifierId: string, notes?: string): void {
    if (this.props.status === DocumentStatus.VERIFIED) {
      throw new Error('El documento ya está verificado');
    }
    this.props.status = DocumentStatus.VERIFIED;
    this.props.verifierId = verifierId;
    this.props.verifiedAt = new Date();
    if (notes) {
      this.props.notes = notes;
    }
    this.props.updatedAt = new Date();
  }

  public reject(verifierId: string, notes: string): void {
    if (this.props.status === DocumentStatus.REJECTED) {
      throw new Error('El documento ya está rechazado');
    }
    if (!notes.trim()) {
      throw new Error('Se requieren notas para rechazar un documento');
    }
    this.props.status = DocumentStatus.REJECTED;
    this.props.verifierId = verifierId;
    this.props.notes = notes;
    this.props.updatedAt = new Date();
  }

  public addNote(note: string): void {
    if (!note.trim()) {
      throw new Error('La nota no puede estar vacía');
    }
    this.props.notes = this.props.notes 
      ? `${this.props.notes}\n${note}`
      : note;
    this.props.updatedAt = new Date();
  }
} 