import { ReadStream, WriteStream } from 'fs';
import { Readable } from 'stream';

import { backendStorageDevelopment } from './development/development-storage';
import { backendStorageS3 } from './s3/s3-storage';

const backendsStorage: Record<string, BackendStorage> = {
  S3: backendStorageS3,
  DEV: backendStorageDevelopment,
};

export const storageProvider = process.env.STORAGE_PROVIDER
  ? backendsStorage[process.env.STORAGE_PROVIDER]
  : backendStorageDevelopment;

export interface BackendStorage {
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
