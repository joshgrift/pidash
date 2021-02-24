import {
  Application,
  send,
  Router,
} from "https://deno.land/x/oak@v6.5.0/mod.ts";

const app = new Application();

const router = new Router();

router.get("/", async (ctx) => {
  await send(ctx, "index.html", { root: `${Deno.cwd()}/public` });
});

router.post("/request", async (ctx) => {
  const { value } = ctx.request.body({ type: "json" });
  const { url } = await value;

  var result = await fetch(url);

  ctx.response.body = await result.json();
});

app.use(router.routes());
app.use(async (ctx) => {
  await send(ctx, ctx.request.url.pathname, { root: `${Deno.cwd()}/public` });
});

await app.listen("127.0.0.1:3000");
