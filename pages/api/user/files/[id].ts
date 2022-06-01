import type { NextApiRequest, NextApiResponse } from "next";
import { pipeline } from 'stream/promises';

import { storageProvider } from '../../../../backend-providers/storage';
import { Prisma } from '../../../../utils/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).end();
    return;
  }

  const file = await Prisma.file.findUnique({
    where: { id: req.query.id as string },
  });

  if (!file) {
    res.status(404).end();
    return;
  }

  const downloader = storageProvider.createDownloadStream({
    fileLocation: file?.location,
  });

  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${file.filename}"`
  );
  await pipeline(downloader, res);

  res.end();
}
