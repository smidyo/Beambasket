import type { NextApiRequest, NextApiResponse } from "next";
import busboy from 'busboy';
import { ReadStream } from 'fs';
import { pipeline } from 'stream/promises';
import { string } from 'yup';

import { storageProvider, uploadFile } from '../../../../backend-providers/storage';
import {
    vectorExpressVectorPipeline
} from '../../../../backend-providers/vector-express/vector-express-vector-pipeline';
import { vectorPipelineProvider } from '../../../../backend-providers/vector-pipeline';
import { vectorExtensionToFormat, VectorFile, VectorFormat } from '../../../../types/vector';
import { Prisma } from '../../../../utils/prisma';

export interface DesignsResponse {
  designs: Array<{ id: string }>;
}

export interface DesignResponse {
  id: string;
  name: string;
  previewSvgFileId: string;
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DesignsResponse | DesignResponse>
) {
  switch (req.method) {
    case "GET": {
      const designs = await Prisma.design.findMany({});

      res.status(200).json({
        designs: designs.map((d) => ({
          id: d.id,
        })),
      });
      return;
    }
    case "POST": {
      const result = await new Promise<DesignResponse>((res) => {
        const bb = busboy({ headers: req.headers });

        bb.on("file", async (name, file, { filename }) => {
          if (name !== "file") return;

          const location = await uploadFile({
            file,
            filename,
          });

          const fileToConvertStream = storageProvider.createDownloadStream({
            fileLocation: location,
          });

          const extension = filename.split(".").pop() ?? "svg";

          const { vectorFile } =
            await vectorPipelineProvider.generateSvgPreview({
              vectorFile: {
                filename,
                location,
                stream: fileToConvertStream,
                format: vectorExtensionToFormat(extension),
              },
            });

          const design = await Prisma.design.create({
            data: {
              name: filename,
              user: { create: {} },
              originalFile: { create: { filename, location } },
              svgPreviewFile: {
                create: {
                  filename: vectorFile.filename,
                  location: vectorFile.location,
                },
              },
            },
          });

          res({
            id: design.id,
            name: design.name,
            previewSvgFileId: design.svgPreviewFileId,
          });
        });

        pipeline(req, bb);
      });

      res.json(result);

      return;
    }
    default: {
      res.status(405).end();
      return;
    }
  }
}
