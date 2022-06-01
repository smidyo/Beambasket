// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from '../../../../utils/prisma';

export interface DesignsResponse {
  designs: Array<{ id: string }>;
}

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
    }
    case "POST": {
    }
    default: {
      res.status(405);
      return;
    }
  }
}
