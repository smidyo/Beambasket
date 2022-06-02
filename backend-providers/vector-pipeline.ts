import { VectorFile, VectorFileStream, VectorFormat } from '../types/vector';
import { vectorExpressVectorPipeline } from './vector-express/vector-express-vector-pipeline';

const vectorPipelineProviders: Record<
  string,
  VectorPipelineProvider<VectorFormat, VectorFormat, EstimationSelectionMethod>
> = {
  VECTOR_EXPRESS: vectorExpressVectorPipeline as any,
};

export const vectorPipelineProvider = process.env.VECTOR_PIPELINE_PROVIDER
  ? vectorPipelineProviders[process.env.VECTOR_PIPELINE_PROVIDER]
  : vectorExpressVectorPipeline;

export enum EstimationSelectionMethod {
  NoSelection,
  ByStrokeFill,
}

interface EstimationSelectionData {
  [EstimationSelectionMethod.NoSelection]: {};
  [EstimationSelectionMethod.ByStrokeFill]: EstimationSelectionDataByStrokeFill;
}

interface EstimationSelectionDataByStrokeFill {
  strokeColors: Color[];
  fillColors: Color[];
}

type Color = [r: number, g: number, b: number];

export interface VectorPipelineProvider<
  CF extends VectorFormat,
  EF extends VectorFormat,
  ES extends EstimationSelectionMethod
> {
  /** Which formats the client can upload to be processed */
  supportedClientFormats: CF[];

  /** Which format to be used for estimating laser time */
  estimationFormat: EF;

  /**
   * A function which takes in a supported client format,
   * and returns it as an SVG representation.
   */
  generateSvgPreview: (args: {
    vectorFile: VectorFileStream<CF>;
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
