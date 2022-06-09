import React from 'react';

import { frontendVectorPipelineVectorExpress } from './vector-express/vector-express-vector';

const frontendProvidersVectorPipeline: Record<string, FrontendVectorPipeline> =
  {
    VECTOR_EXPRESS: frontendVectorPipelineVectorExpress,
  };

export const vectorPipelineProvider = process.env.VECTOR_PIPELINE_PROVIDER
  ? frontendProvidersVectorPipeline[process.env.VECTOR_PIPELINE_PROVIDER]
  : frontendVectorPipelineVectorExpress;

export interface FrontendVectorPipeline {
  viewportComponent: React.FC<>;

  selectionComponent: React.FC<>;
}
