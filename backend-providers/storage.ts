import { ReadStream, WriteStream } from 'fs';
import { string } from 'yup';

import { developmentStorageProvider } from './development/development-storage';
import { s3StorageProvider } from './s3/s3-storage';

const storageProviders: Record<string, StorageProvider> = {
  S3: s3StorageProvider,
  DEV: developmentStorageProvider,
};

export const storageProvider = process.env.STORAGE_PROVIDER
  ? storageProviders[process.env.STORAGE_PROVIDER]
  : developmentStorageProvider;

export interface StorageProvider {
  getFileUploader: () => WriteStream;

  getFileDownloader(args: { fileLocation: string }): ReadStream;
}
