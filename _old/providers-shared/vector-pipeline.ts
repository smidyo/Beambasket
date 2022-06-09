import { VectorFormat } from '../types/vector';
import { sharedVectorPipelineVectorExpress } from './vector-express/vector-express-vector-pipeline';

const sharedProvidersVectorPipeline: Record<string, SharedVectorPipeline> = {
  VECTOR_EXPRESS: sharedVectorPipelineVectorExpress,
};

export const vectorPipelineProvider = process.env.VECTOR_PIPELINE_PROVIDER
  ? sharedProvidersVectorPipeline[process.env.VECTOR_PIPELINE_PROVIDER]
  : sharedVectorPipelineVectorExpress;

export interface SharedVectorPipeline<CF extends VectorFormat = VectorFormat> {
  /** Which formats the client can upload to be processed */
  supportedClientFormats: CF[];

  /** Which parameters to provide for materials */
  materialParams: Record<string, "string" | "number" | "boolean">;
}

/**
 * Allow grouping of configs, e.g. materials and laser profiles
 */
