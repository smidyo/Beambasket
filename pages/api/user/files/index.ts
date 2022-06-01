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
  if (req.method !== "POST") {
    res.status(405);
    return;
  }
}
