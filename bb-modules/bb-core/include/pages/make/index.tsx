import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session?.user?.email) {
    return { redirect: { destination: "/", statusCode: 307 } };
  }

  const basketPart = await Prisma.basketPart.create({
    data: { user: { connect: { email: session.user.email } } },
  });

  return {
    redirect: {
      destination: `/make/${basketPart.id}`,
      statusCode: 307,
    },
  };
};

const MakeIndexPage: NextPage = () => {
  return <div>Loading...</div>;
};

export default MakeIndexPage;
