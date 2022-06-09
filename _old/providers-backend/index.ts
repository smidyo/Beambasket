import { BackendProviderVector } from './vector';

export const BackendProviderStorage = null;

export const BackendProviderVector: BackendProviderVector = null;

/**
 * Do frontend and backend from same file to avoid having to triple define
 * backend frontend shared
 * 
 * Tree shaking ought to work... ?
 */