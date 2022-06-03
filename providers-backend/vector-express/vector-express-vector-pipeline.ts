import { get, request } from 'https';
import { pipeline } from 'stream/promises';

import {
    sharedVectorPipelineVectorExpress
} from '../../providers-shared/vector-express/vector-express-vector-pipeline';
import { EstimationSelectionMethod } from '../../providers-shared/vector-pipeline';
import { VectorFormat } from '../../types/vector';
import { storageProvider } from '../storage';
import { BackendVectorPipeline } from '../vector-pipeline';

export const backendVectorPipelineVectorExpress: BackendVectorPipeline<
  typeof sharedVectorPipelineVectorExpress,
  VectorFormat.Svg,
  EstimationSelectionMethod.ByStrokeFill
> = {
  estimationFormat: VectorFormat.Svg,

  generateSvgPreview: async ({ vectorFile }) => {
    const paths = await fetch(
      `https://vector.express/api/v2/public/convert/${vectorFile.format}/auto/svg`
    ).then((res) => res.json());

    const filename = `${vectorFile.filename}.svg`;

    const downloadUrl = await new Promise<string>((res, rej) => {
      let json = "";
      const req = request(
        {
          hostname: "vector.express",
          path: paths.alternatives[0].path,
          port: 443,
          method: "POST",
          //headers: { "Content-Type": "application/pdf" },
        },
        (s) => {
          s.on("data", (data) => (json += data));
          s.on("close", () => {
            console.log(json);
            res(JSON.parse(json).resultUrl);
          });
        }
      );

      pipeline(vectorFile.stream, req);
    });

    const stream = storageProvider.createUploadStream({
      filename,
    });

    await new Promise<void>((res, rej) => {
      get(downloadUrl, (s) => {
        s.on("data", (data) => stream.stream.write(data));
        s.on("close", () => {
          stream.stream.end();
          res();
        });
      });
    });

    return {
      vectorFile: {
        filename,
        location: stream.fileLocation,
        format: VectorFormat.Svg,
      },
    };
  },

  estimationSelectionMethod: 0, // EstimationSelectionMethod.ByStrokeFill,

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
