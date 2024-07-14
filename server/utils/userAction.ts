import prisma from "./db";

export const getUsers = async () => {
  return prisma.user.findMany();
};

export const updateUserStatus = async (ids: string[], status: string) => {
  return prisma.user.updateMany({
    where: { id: { in: ids } },
    data: { status },
  });
};

export const deleteUser = async (ids: string[]) => {
  return prisma.user.deleteMany({
    where: { id: { in: ids } },
  });
};
