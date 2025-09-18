import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const db = new PrismaClient();

async function main() {
  await db.post.createMany({
    data: [
      { title: "Пост", content: "Содержимое поста" },
      { title: "Еще пост", content: "Содержимое поста" },
    ],
  });
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
