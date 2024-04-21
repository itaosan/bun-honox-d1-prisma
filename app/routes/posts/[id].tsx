import { createRoute } from "honox/factory";
import { PrismaClient } from "@prisma/client";
import { PrismaD1 } from "@prisma/adapter-d1";

export default createRoute(async (c) => {
  const adapter = new PrismaD1(c.env.DB);
  const prisma = new PrismaClient({ adapter });
  const { id } = c.req.param();
  const post = await prisma.post.findUnique({
    where: {
      id: id,
    },
  });
  return c.render(
    <div>
      <h1>{post?.title}</h1>
      <p>{post?.content}</p>
      <a href={"/posts"}>posts</a>
    </div>
  );
});
