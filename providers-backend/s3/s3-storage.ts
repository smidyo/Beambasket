import { BackendStorage } from '../storage';

export const BackendProviderStorageS3: BackendStorageProvider = {
  async uploadFile({ data, fileName }) {
    return { filePath: "" };
  },
};
