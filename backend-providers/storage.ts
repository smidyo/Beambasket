import { s3StorageProvider } from './s3/s3-storage';

const storageProviders: Record<string, StorageProvider> = {
  S3: s3StorageProvider,
};

export default storageProviders[process.env.STORAGE_PROVIDER || "S3"];

export interface StorageProvider {
  uploadFile: (args: {
    data: ReadableStream;
    fileName: string;
  }) => Promise<{ filePath: string }>;
}
