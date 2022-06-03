import { object } from 'yup';

import {
    EstimationSelectionData, EstimationSelectionMethod, SharedVectorPipeline
} from '../providers-shared/vector-pipeline';
import { File } from '../types/file';
import { VectorFile, VectorFileStream, VectorFormat } from '../types/vector';
import { backendVectorPipelineVectorExpress } from './vector-express/vector-express-vector';

const backendsVectorPipeline: Record<
  string,
  BackendVectorPipeline<
    SharedVectorPipeline,
    VectorFormat,
    EstimationSelectionMethod
  >
> = {
  VECTOR_EXPRESS: backendVectorPipelineVectorExpress as any,
};

export const backendVectorPipeline = process.env.VECTOR_PIPELINE_PROVIDER
  ? backendsVectorPipeline[process.env.VECTOR_PIPELINE_PROVIDER]
  : backendVectorPipelineVectorExpress;

export interface BackendVectorPipeline<
  S extends SharedVectorPipeline,
  IF extends VectorFormat,
  SD extends object
> {
  /** Which format to be used for estimating laser time */
  estimationFormat: IF;

  /**
   * A function which takes in a supported client format,
   * and returns it as an SVG representation.
   */
  generatePreview: (args: {
    vectorFile: VectorFileStream<S["supportedClientFormats"]>;
  }) => Promise<File>;

  generateIntermediate: (args: {
    vectorFile: VectorFileStream<S["supportedClientFormats"]>;
  }) => Promise<File>;

  /**
   * 
   */
  estimateMaterialUsage: (args: {
    vectorFile: VectorFileStream<IF>;
    selectionData: SD;
  }) =>

  /**
   * A function which takes in a vector of format estimationFormat,
   * and returns the estimated linear movement time in seconds.
   */
  estimateLinearMovement?: (args: {
    vectorFile: VectorFileStream<IF>;
    speedMmPerS: number;
    selectionData: LD;
  }) => Promise<{ seconds: number }>;

  /**
   * A function which takes in a vector of format estimationFormat,
   * and returns the estimated laser raster time in seconds.
   */
  estimateRasterMovement?: (args: {
    vectorFile: VectorFileStream<IF>;
    speedMmPerS: number;
    linesPerMm: number;
    selectionData: RD;
  }) => Promise<{ seconds: number }>;
}
