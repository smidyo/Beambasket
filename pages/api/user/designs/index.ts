import type { NextApiRequest, NextApiResponse } from "next";
import busboy from 'busboy';
import { pipeline } from 'stream/promises';

import { storageProvider, uploadFile } from '../../../../providers-backend/storage';
import { providerBackendVectorPipeline } from '../../../../providers-backend/vector-pipeline';
import { vectorExtensionToFormat } from '../../../../types/vector';
import { Prisma } from '../../../../utils/prisma';

export interface DesignsResponse {
  designs: DesignResponse[];
}

export interface DesignResponse {
  id: string;
  name: string;
  previewSvgFileId: string;
}

export const config = {
  api: { bodyParser: false },
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
          previewSvgFileId: d.svgPreviewFileId,
          name: d.name,
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
            await providerBackendVectorPipeline.generateSvgPreview({
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
