import { VectorFile, VectorFormat } from '../../types/vector';
import { EstimationSelectionMethod, VectorPipelineProvider } from '../vector-pipeline';

export const vectorExpressVectorPipeline: VectorPipelineProvider<
  | VectorFormat.Ai
  | VectorFormat.Dwg
  | VectorFormat.Dxf
  | VectorFormat.Eps
  | VectorFormat.Pdf
  | VectorFormat.Svg,
  VectorFormat.Svg,
  EstimationSelectionMethod.ByStrokeFill
> = {
  supportedClientFormats: [
    VectorFormat.Ai,
    VectorFormat.Dwg,
    VectorFormat.Dxf,
    VectorFormat.Eps,
    VectorFormat.Pdf,
    VectorFormat.Svg,
  ],

  estimationFormat: VectorFormat.Svg,

  generateSvgPreview: async ({ vectorFile }) => {
    return { vectorFile: vectorFile as VectorFile<VectorFormat.Svg> };
  },

  estimationSelectionMethod: EstimationSelectionMethod.ByStrokeFill,

  estimateLinearMovement: async ({
    vectorFile,
    speedMmPerS,
    estimationSelectionData,
  }) => {
    return { seconds: 10 };
  },

  estimateRasterMovement: async ({
    vectorFile,
    speedMmPerS,
    linesPerMm,
    estimationSelectionData,
  }) => {
    return { seconds: 10 };
  },
};
