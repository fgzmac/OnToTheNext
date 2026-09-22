import { getPrismaClient } from "@/src/lib/prisma";

export const PROTOTYPE_OWNER_ID = "cmg00000000000000000000001";

export async function ensurePrototypeOwner() {
  const prisma = getPrismaClient();
  return prisma.prototypeUser.upsert({
    where: { id: PROTOTYPE_OWNER_ID },
    update: {},
    create: {
      id: PROTOTYPE_OWNER_ID,
      displayName: "Prototype Owner",
    },
  });
}
