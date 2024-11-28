import { Document } from '../entity/document';
import { DocumentMetadata } from '../value-objects/document-metadata';
import { DocumentType, DocumentStatus } from '../types/document-type';

describe('Document Entity', () => {
  const mockMetadata = DocumentMetadata.create({
    fileName: 'test.pdf',
    mimeType: 'application/pdf',
    size: 1024 * 1024,
    hash: 'a'.repeat(64)
  });

  const validProps = {
    type: DocumentType.PROPERTY_TITLE,
    metadata: mockMetadata,
    uploaderId: 'uploader-1',
  };

  describe('create', () => {
    it('should create a valid document', () => {
      const document = Document.create(validProps);

      expect(document).toBeInstanceOf(Document);
      expect(document.id).toBeDefined();
      expect(document.type).toBe(validProps.type);
      expect(document.metadata).toBe(mockMetadata);
      expect(document.status).toBe(DocumentStatus.PENDING);
      expect(document.uploaderId).toBe(validProps.uploaderId);
      expect(document.verifierId).toBeUndefined();
      expect(document.notes).toBeUndefined();
      expect(document.createdAt).toBeInstanceOf(Date);
      expect(document.updatedAt).toBeInstanceOf(Date);
      expect(document.verifiedAt).toBeUndefined();
    });

    it('should throw error for invalid document type', () => {
      expect(() => Document.create({
        ...validProps,
        type: 'INVALID_TYPE' as DocumentType
      })).toThrow('Tipo de documento inválido');
    });
  });

  describe('verify', () => {
    it('should verify a pending document', () => {
      const document = Document.create(validProps);
      const verifierId = 'verifier-1';
      const notes = 'Verification notes';

      document.verify(verifierId, notes);

      expect(document.status).toBe(DocumentStatus.VERIFIED);
      expect(document.verifierId).toBe(verifierId);
      expect(document.notes).toBe(notes);
      expect(document.verifiedAt).toBeInstanceOf(Date);
    });

    it('should throw error when verifying an already verified document', () => {
      const document = Document.create(validProps);
      document.verify('verifier-1');

      expect(() => document.verify('verifier-2'))
        .toThrow('El documento ya está verificado');
    });
  });

  describe('reject', () => {
    it('should reject a pending document', () => {
      const document = Document.create(validProps);
      const verifierId = 'verifier-1';
      const notes = 'Rejection reason';

      document.reject(verifierId, notes);

      expect(document.status).toBe(DocumentStatus.REJECTED);
      expect(document.verifierId).toBe(verifierId);
      expect(document.notes).toBe(notes);
    });

    it('should throw error when rejecting without notes', () => {
      const document = Document.create(validProps);

      expect(() => document.reject('verifier-1', ''))
        .toThrow('Se requieren notas para rechazar un documento');
    });

    it('should throw error when rejecting an already rejected document', () => {
      const document = Document.create(validProps);
      document.reject('verifier-1', 'Initial rejection');

      expect(() => document.reject('verifier-2', 'Additional rejection'))
        .toThrow('El documento ya está rechazado');
    });
  });
}); 