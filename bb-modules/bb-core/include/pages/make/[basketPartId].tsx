import { getSession } from 'next-auth/react';

import { Prisma } from '../../utils/prisma';
import { MakeWidget } from '../../widgets/make';

import type { GetServerSideProps, NextPage } from "next";
interface Props {
  basketPartId: string;
}

export const getServerSideProps: GetServerSideProps<
  Props,
  { basketPartId?: string }
> = async (context) => {
  const session = await getSession(context);

  /*if (!session?.user?.email) {
    return { redirect: { destination: "/", statusCode: 307 } };
  }*/

  const basketPart =
    context.params?.basketPartId !== undefined
      ? await Prisma.basketPart.findUnique({
          where: { id: context.params?.basketPartId },
        })
      : null;

  if (!basketPart) {
    return {
      redirect: {
        destination: "/make/",
        statusCode: 307,
      },
    };
  }

  return {
    props: {
      basketPartId: basketPart.id,
    },
  };
};

const MakePage: NextPage<Props> = (props) => {
  return <MakeWidget basketPartId={props.basketPartId} />;
};

export default MakePage;
