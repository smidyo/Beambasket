import { VectorFormat } from '../types/vector';
import { sharedVectorPipelineVectorExpress } from './vector-express/vector-express-vector-pipeline';

export enum EstimationSelectionMethod {
  NoSelection,
  ByStrokeFill,
}

export interface EstimationSelectionData {
  [EstimationSelectionMethod.NoSelection]: {};
  [EstimationSelectionMethod.ByStrokeFill]: EstimationSelectionDataByStrokeFill;
}

export interface EstimationSelectionDataByStrokeFill {
  strokeColors: Color[];
  fillColors: Color[];
}

export type Color = [r: number, g: number, b: number];

const sharedProvidersVectorPipeline: Record<string, SharedVectorPipeline> = {
  VECTOR_EXPRESS: sharedVectorPipelineVectorExpress,
};

export const vectorPipelineProvider = process.env.VECTOR_PIPELINE_PROVIDER
  ? sharedProvidersVectorPipeline[process.env.VECTOR_PIPELINE_PROVIDER]
  : sharedVectorPipelineVectorExpress;

export interface SharedVectorPipeline<CF extends VectorFormat = VectorFormat> {
  /** Which formats the client can upload to be processed */
  supportedClientFormats: CF[];
}
