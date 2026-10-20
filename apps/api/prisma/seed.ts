import prisma from "../src/utils/prisma";

async function seedDB() {
  await prisma.category.createMany({
    data: {
      name: "TRANSPORT",
    },
  });
  await prisma.category.createMany({
    data: {
      name: "ENTERTAINMENT",
    },
  });
  await prisma.category.createMany({
    data: {
      name: "OTHER",
    },
  });
}

seedDB();
