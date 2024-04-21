import { createRoute } from "honox/factory";
import { PrismaClient } from "@prisma/client";
import { PrismaD1 } from "@prisma/adapter-d1";

export default createRoute((c) => {
  return c.render(
    <div>
      <h1>Create Post</h1>
      <form method="post">
        <label>
          Title
          <input name="title" type="text" />
        </label>
        <label>
          Content
          <textarea name="content" />
        </label>
        <button type="submit">Create</button>
      </form>
    </div>,
    {
      title: "Create Post",
    }
  );
});

export const POST = createRoute(async (c) => {
  const adapter = new PrismaD1(c.env.DB);
  const prisma = new PrismaClient({ adapter });
  const body = await c.req.formData();
  const user = await prisma.post.create({
    data: {
      title: body.get("title")?.toString() ?? "",
      content: body.get("content")?.toString() ?? "",
    },
  });
  return c.redirect("/posts");
});
