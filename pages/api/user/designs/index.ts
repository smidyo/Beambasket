import type { NextApiRequest, NextApiResponse } from "next";
import busboy from 'busboy';
import { ReadStream } from 'fs';
import { pipeline } from 'stream/promises';

import { storageProvider, uploadFile } from '../../../../backend-providers/storage';
import { vectorPipelineProvider } from '../../../../backend-providers/vector-pipeline';
import { VectorFormat } from '../../../../types/vector';
import { Prisma } from '../../../../utils/prisma';

export interface DesignsResponse {
  designs: Array<{ id: string }>;
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DesignsResponse>
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
      const bb = busboy({ headers: req.headers });

      bb.on("file", async (name, file, { filename }) => {
        if (name !== "file") return;

        const location = await uploadFile({
          file,
          filename,
        });

        // await new Promise((res) => setTimeout(res, 2000));

        const fileToConvertStream = storageProvider.createDownloadStream({
          fileLocation: location,
        });

        const { vectorFile } = await vectorPipelineProvider.generateSvgPreview({
          vectorFile: {
            filename,
            stream: fileToConvertStream,
            format: VectorFormat.Ai,
          },
        });

        await Prisma.design.create({
          data: {
            name: filename,
            user: { create: {} },
            originalFile: { create: { filename, location } },
            svgPreviewFile: {
              create: {
                filename: vectorFile.filename,
                location: '',
              },
            },
          },
        });
      });

      await pipeline(req, bb);

      res.status(200).end();
      return;
    }
    default: {
      res.status(405).end();
      return;
    }
  }
}
