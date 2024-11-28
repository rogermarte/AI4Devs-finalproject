import { DocumentMetadata } from '../value-objects/document-metadata';

describe('DocumentMetadata Value Object', () => {
  const validProps = {
    fileName: 'test-document.pdf',
    mimeType: 'application/pdf',
    size: 1024 * 1024, // 1MB
    hash: 'a'.repeat(64) // SHA-256 hash simulado
  };

  describe('creation', () => {
    it('should create valid document metadata', () => {
      const metadata = DocumentMetadata.create(validProps);

      expect(metadata.fileName).toBe(validProps.fileName);
      expect(metadata.mimeType).toBe(validProps.mimeType);
      expect(metadata.size).toBe(validProps.size);
      expect(metadata.hash).toBe(validProps.hash);
    });
  });

  describe('validation', () => {
    describe('fileName', () => {
      it('should throw error for empty filename', () => {
        expect(() => DocumentMetadata.create({
          ...validProps,
          fileName: ''
        })).toThrow('El nombre del archivo no puede estar vacío');

        expect(() => DocumentMetadata.create({
          ...validProps,
          fileName: '   '
        })).toThrow('El nombre del archivo no puede estar vacío');
      });

      it('should throw error for too long filename', () => {
        expect(() => DocumentMetadata.create({
          ...validProps,
          fileName: 'a'.repeat(256)
        })).toThrow('El nombre del archivo es demasiado largo');
      });
    });

    describe('mimeType', () => {
      it('should throw error for invalid mime type', () => {
        expect(() => DocumentMetadata.create({
          ...validProps,
          mimeType: 'invalid/type'
        })).toThrow('Tipo de archivo no permitido');
      });

      it('should accept all valid mime types', () => {
        const validMimeTypes = [
          'application/pdf',
          'image/jpeg',
          'image/png',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];

        validMimeTypes.forEach(mimeType => {
          expect(() => DocumentMetadata.create({
            ...validProps,
            mimeType
          })).not.toThrow();
        });
      });
    });

    describe('size', () => {
      it('should throw error for negative or zero size', () => {
        expect(() => DocumentMetadata.create({
          ...validProps,
          size: 0
        })).toThrow('El tamaño del archivo debe ser positivo');

        expect(() => DocumentMetadata.create({
          ...validProps,
          size: -1
        })).toThrow('El tamaño del archivo debe ser positivo');
      });

      it('should throw error for size exceeding maximum', () => {
        expect(() => DocumentMetadata.create({
          ...validProps,
          size: 11 * 1024 * 1024 // 11MB
        })).toThrow('El archivo excede el tamaño máximo permitido');
      });
    });

    describe('hash', () => {
      it('should throw error for empty hash', () => {
        expect(() => DocumentMetadata.create({
          ...validProps,
          hash: ''
        })).toThrow('El hash del archivo no puede estar vacío');

        expect(() => DocumentMetadata.create({
          ...validProps,
          hash: '   '
        })).toThrow('El hash del archivo no puede estar vacío');
      });

      it('should throw error for invalid hash format', () => {
        expect(() => DocumentMetadata.create({
          ...validProps,
          hash: 'invalid-hash'
        })).toThrow('Formato de hash inválido');

        expect(() => DocumentMetadata.create({
          ...validProps,
          hash: 'a'.repeat(63) // Un carácter menos
        })).toThrow('Formato de hash inválido');
      });
    });
  });
}); 