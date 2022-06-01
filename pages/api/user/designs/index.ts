// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import busboy from 'busboy';

import { storageProvider } from '../../../../backend-providers/storage';
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

      bb.on("file", (name, file, info) => {
        const uploader = storageProvider.getFileUploader();

        file
          .on("data", (data) => {
            uploader.write(data);
          })
          .on("close", () => uploader.close());
      });

      req.pipe(bb);

      res.status(200).end();
      return;
    }
    default: {
      res.status(405).end();
      return;
    }
  }
}
