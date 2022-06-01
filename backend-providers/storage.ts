import busboy from 'busboy';
import { ReadStream, WriteStream } from 'fs';
import { Readable } from 'stream';

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
  createUploadStream: (args: { filename: string }) => {
    fileLocation: string;
    stream: WriteStream;
  };

  createDownloadStream(args: { fileLocation: string }): ReadStream;
}

export const uploadFile = ({
  file,
  filename,
}: {
  file: Readable;
  filename: string;
}) =>
  new Promise<string>((res, rej) => {
    const uploader = storageProvider.createUploadStream({
      filename,
    });

    file
      .on("data", (data) => {
        uploader.stream.write(data);
      })
      .on("close", () => res(uploader.fileLocation));
  });
