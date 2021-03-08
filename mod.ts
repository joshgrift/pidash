import * as Express from "express";
import * as bodyParser from "body-parser";
import * as path from "path";
import fetch from "node-fetch";

const app = Express();

app.use(bodyParser.json());

app.get("/", (req: Express.Request, res: Express.Response) => {
  res.sendFile("index.html", { root: path.join(__dirname, "public") });
});

app.post("/request", async (req: Express.Request, res: Express.Response) => {
  var result = await fetch(req.body.url);

  res.json(await result.json());
});

app.use(
  Express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

app.listen(process.env.PORT);
