import { createReadStream, createWriteStream, open } from 'fs';
import { nanoid } from 'nanoid';
import { join } from 'path';

import { StorageProvider } from '../storage';

export const developmentStorageProvider: StorageProvider = {
  getFileUploader() {
    const hash = nanoid();
    const location = join(process.env.DEVELOPMENT_STORAGE_PROVIDER_PATH!, hash);
    const stream = createWriteStream(location);

    stream.on('close', () => {console.log('finished')})
    console.log('test')

    return stream;
  },

  getFileDownloader({ fileLocation }) {
    const stream = createReadStream(fileLocation);

    return stream;
  },
};
