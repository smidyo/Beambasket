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
};
