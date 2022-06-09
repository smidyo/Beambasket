// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from '../../../utils/prisma';

export interface MaterialsResponse {
  materialCategories: Array<{
    id: string;
    nameKey: string;
    materialVariants: Array<{
      id: string;
      nameKey: string;
      materials: Array<{
        id: string;
        nameKey: string;
      }>;
    }>;
  }>;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MaterialsResponse>
) {
  if (req.method !== "GET") {
    res.status(405);
    return;
  }

  const categories = await Prisma.materialsCategory.findMany({
    include: { materialVariants: { include: { materials: true } } },
  });

  res.status(200).json({
    materialCategories: categories.map((mc) => ({
      id: mc.id,
      nameKey: mc.nameKey,
      materialVariants: mc.materialVariants.map((mv) => ({
        id: mv.id,
        nameKey: mv.nameKey,
        materials: mv.materials.map((m) => ({
          id: m.id,
          nameKey: m.nameKey,
        })),
      })),
    })),
  });
}
