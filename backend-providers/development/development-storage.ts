import { createReadStream, createWriteStream } from 'fs';
import { nanoid } from 'nanoid';
import { join } from 'path';
import { pipeline } from 'stream/promises';

import { StorageProvider } from '../storage';

export const developmentStorageProvider: StorageProvider = {
  async uploadFile({ data, fileName }) {
    const hash = nanoid();
    const location = join(__dirname, "files", hash);
    const stream = createWriteStream(location);

    await pipeline(data, stream);

    return { fileLocation: location };
  },

  async downloadFile({ fileLocation }) {
    const stream = createReadStream(fileLocation);

    return { data: stream };
  },
};
