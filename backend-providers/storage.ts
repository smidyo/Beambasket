import { ReadStream } from 'fs';

import { s3StorageProvider } from './s3/s3-storage';

export const storageProvider = s3StorageProvider;

export interface StorageProvider {
  uploadFile: (args: {
    data: ReadStream;
    fileName: string;
  }) => Promise<{ fileLocation: string }>;

  downloadFile (args: {
    fileLocation: string;
  }): Promise<{ data: ReadStream }>;
}
