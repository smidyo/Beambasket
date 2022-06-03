import { BackendStorage } from '../storage';

export const backendStorageS3: BackendStorage = {
  async uploadFile({ data, fileName }) {
    return { filePath: "" };
  },
};
