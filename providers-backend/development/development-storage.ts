import { createReadStream, createWriteStream } from 'fs';
import { customAlphabet } from 'nanoid';
import { join } from 'path';

import { BackendStorage } from '../storage';

export const backendStorageDevelopment: BackendStorage = {
  createUploadStream({ filename }) {
    const extension = filename.split(".").pop();

    const hash = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz")(20);
    const path =
      join(process.env.DEVELOPMENT_STORAGE_PROVIDER_PATH!, hash) +
      "." +
      extension;

    const stream = createWriteStream(path);

    return { stream, fileLocation: path };
  },

  createDownloadStream({ fileLocation }) {
    const stream = createReadStream(fileLocation);

    return stream;
  },
};
