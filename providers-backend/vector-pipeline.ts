import {
    EstimationSelectionData, EstimationSelectionMethod, SharedVectorPipeline
} from '../providers-shared/vector-pipeline';
import { VectorFile, VectorFileStream, VectorFormat } from '../types/vector';
import {
    backendVectorPipelineVectorExpress
} from './vector-express/vector-express-vector-pipeline';

const backendsVectorPipeline: Record<
  string,
  BackendVectorPipeline<SharedVectorPipeline, VectorFormat, EstimationSelectionMethod>
> = {
  VECTOR_EXPRESS: backendVectorPipelineVectorExpress as any,
};

export const backendVectorPipeline = process.env.VECTOR_PIPELINE_PROVIDER
  ? backendsVectorPipeline[process.env.VECTOR_PIPELINE_PROVIDER]
  : backendVectorPipelineVectorExpress;

export interface BackendVectorPipeline<
  S extends SharedVectorPipeline,
  EF extends VectorFormat,
  ES extends EstimationSelectionMethod
> {
  /** Which format to be used for estimating laser time */
  estimationFormat: EF;

  /**
   * A function which takes in a supported client format,
   * and returns it as an SVG representation.
   */
  generateSvgPreview: (args: {
    vectorFile: VectorFileStream<S["supportedClientFormats"]>;
  }) => Promise<{ vectorFile: VectorFile<VectorFormat.Svg> }>;

  /**
   * The method of which to pick out parts of the drawing to estimate
   */
  estimationSelectionMethod: ES;

  /**
   * A function which takes in a vector of format estimationFormat,
   * and returns the estimated linear movement time in seconds.
   */
  estimateLinearMovement?: (args: {
    vectorFile: VectorFileStream<EF>;
    speedMmPerS: number;
    estimationSelectionData: EstimationSelectionData[ES];
  }) => Promise<{ seconds: number }>;

  /**
   * A function which takes in a vector of format estimationFormat,
   * and returns the estimated laser raster time in seconds.
   */
  estimateRasterMovement?: (args: {
    vectorFile: VectorFileStream<EF>;
    speedMmPerS: number;
    linesPerMm: number;
    estimationSelectionData: EstimationSelectionData[ES];
  }) => Promise<{ seconds: number }>;
}
