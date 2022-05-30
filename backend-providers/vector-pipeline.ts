import { VectorFile, VectorFormat } from '../types/vector';

export interface VectorPipelineProvider<
  CF extends VectorFormat,
  EF extends VectorFormat
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
    vectorFile: CF;
  }) => Promise<{ vectorFile: VectorFile<VectorFormat.Svg> }>;

  /**
   * A function which takes in a vector of format estimationFormat,
   * and returns the estimated linear movement time in seconds.
   */
  estimateLinearMovement?: (args: {
    vectorFile: VectorFile<EF>;
    materialCuttingSpeedMmPerS: number;
  }) => Promise<{ seconds: number }>;

  /**
   * A function which takes in a vector of format estimationFormat,
   * and returns the estimated laser raster time in seconds.
   */
  estimateRasterMovement?: (args: {
    vectorFile: VectorFile<EF>;
    materialEngravingSpeedMmPerS: number;
    dpi: number;
  }) => Promise<{ seconds: number }>;
}
