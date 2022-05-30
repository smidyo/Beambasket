import { StorageProvider } from '../old/storage/storage-provider';

export const s3StorageProvider: StorageProvider = {
  async uploadFile({ data, fileName }) {
    return { filePath: "" };
  },
};
