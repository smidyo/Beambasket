import { getSession } from 'next-auth/react';

import { Prisma } from '../../utils/prisma';
import { MaterialSidebar } from '../../widgets/material-sidebar';
import { Materials } from '../../widgets/materials';

import type { GetServerSideProps, NextPage } from "next";
interface Props {
  designs: Array<{ filename: string; previewSvg: string }>;
}

export const getServerSideProps: GetServerSideProps<
  Props,
  { basketPartId?: string }
> = async (context) => {
  const session = await getSession(context);

  if (!session?.user?.email) {
    return { redirect: { destination: "/", statusCode: 307 } };
  }

  const basketPart =
    context.params?.basketPartId !== undefined
      ? await Prisma.basketPart.findUnique({
          where: { id: context.params?.basketPartId },
        })
      : await Prisma.basketPart.create({
          data: { user: { connect: { email: session.user.email } } },
        });

  const designs = await Prisma.user
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
    <div className="flex">
      <div className="w-96">
        <MaterialSidebar />
      </div>
      <div className="flex-grow">
        <Materials onSelectMaterial={(materialId) => alert(materialId)} />
      </div>
    </div>
  );
};

export default DesignsPage;
