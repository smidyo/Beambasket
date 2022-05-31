import { s3StorageProvider } from './s3/s3-storage';

export const storageProvider = s3StorageProvider;

export interface StorageProvider {
  uploadFile: (args: {
    data: ReadableStream;
    fileName: string;
  }) => Promise<{ filePath: string }>;
}
