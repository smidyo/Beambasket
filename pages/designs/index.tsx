import { getSession } from 'next-auth/react';

import { PrismaClient } from '@prisma/client';

import type { GetServerSideProps, NextPage } from "next";
interface Props {
  designs: Array<{ filename: string; previewSvg: string }>;
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const session = await getSession(context);

  if (!session?.user?.email) {
    return { redirect: { destination: "/", statusCode: 307 } };
  }

  const designs = await new PrismaClient().user
    .findUnique({ where: { email: session.user.email } })
    .designs();

  return {
    props: {
      designs: designs.map((d) => ({
        filename: d.name,
        previewSvg: d.originalSvgFilePath,
      })),
    },
  };
};

const DesignsPage: NextPage<Props> = (props) => {
  return (
    <>
      {props.designs.map((d) => (
        <div key={d.filename}>{d.filename}</div>
      ))}
    </>
  );
};

export default DesignsPage;
