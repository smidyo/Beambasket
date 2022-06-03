import { ReadStream, WriteStream } from 'fs';
import { Readable } from 'stream';

import { backendProviderStorageDevelopment } from './development/development-storage';
import { backendProviderStorageS3 } from './s3/s3-storage';

const backendProvidersStorage: Record<string, BackendStorage> = {
  S3: backendProviderStorageS3,
  DEV: backendProviderStorageDevelopment,
};

export const backendProviderStorage = process.env.STORAGE_PROVIDER
  ? backendProvidersStorage[process.env.STORAGE_PROVIDER]
  : backendProviderStorageDevelopment;

export interface BackendStorageProvider {
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
    const uploader = backendProvidersStorage.createUploadStream({
      filename,
    });

    file
      .on("data", (data) => {
        uploader.stream.write(data);
      })
      .on("close", () => res(uploader.fileLocation));
  });
