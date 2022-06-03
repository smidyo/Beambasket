import { SharedVectorPipeline } from '../../providers-shared/vector-pipeline';
import { VectorFormat } from '../../types/vector';

export const sharedVectorPipelineVectorExpress: SharedVectorPipeline<
  | VectorFormat.Ai
  | VectorFormat.Dwg
  | VectorFormat.Dxf
  | VectorFormat.Eps
  | VectorFormat.Pdf
  | VectorFormat.Svg
> = {
  supportedClientFormats: [
    VectorFormat.Ai,
    VectorFormat.Dwg,
    VectorFormat.Dxf,
    VectorFormat.Eps,
    VectorFormat.Pdf,
    VectorFormat.Svg,
  ],

  materialParams: {
    ...(process.env.VECTOR_EXPRESS_ENABLE_CUTTING
      ? { cuttingSpeedMmPerS: "number" }
      : {}),
    ...(process.env.VECTOR_EXPRESS_ENABLE_ENGRAVING
      ? { engravingSpeedMmPerS: "number" }
      : {}),
    ...(process.env.VECTOR_EXPRESS_ENABLE_SCORING
      ? { scoringSpeedMmPerS: "number" }
      : {}),
  },
};
