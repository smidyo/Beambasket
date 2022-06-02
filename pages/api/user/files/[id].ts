import mime from 'mime-types';
import { pipeline } from 'stream/promises';

import { storageProvider } from '../../../../backend-providers/storage';
import { Prisma } from '../../../../utils/prisma';

import type { NextApiRequest, NextApiResponse } from "next";
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

  console.log(downloader);

  /*res.setHeader(
    "Content-Disposition",
    `inline; filename="${file.filename}"`
  );*/
  res.setHeader(
    "Content-Type",
    mime.lookup(file.filename.split(".").pop()!) || ""
  );
  await pipeline(downloader, res);

  res.end();
}
