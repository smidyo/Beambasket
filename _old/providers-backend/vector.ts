import { EstimationSelectionMethod, SharedVectorPipeline } from 'm,ä.å';

export const backendVectorPipeline = process.env.VECTOR_PIPELINE_PROVIDER
  ? backendsVectorPipeline[process.env.VECTOR_PIPELINE_PROVIDER]
  : backendVectorPipelineVectorExpress;

export interface BackendProviderVector<
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
