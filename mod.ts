import * as Express from "express";
import * as bodyParser from "body-parser";
import * as path from "path";
import * as fetch from "node-fetch";
import * as dotenv from "dotenv";

// import .env file
dotenv.config();

// build our widget config object
const widgets = {};

for (const widget of process.env.WIDGETS.split(",")) {
  console.log(process.env["WIDGET_" + widget]);
  widgets[widget] = process.env["WIDGET_" + widget];
}

console.log(widgets);

// express.js setup
const app = Express();
app.set("view engine", "ejs");

// parse JSON body
app.use(bodyParser.json());

// homepage
app.get("/", (req: Express.Request, res: Express.Response) => {
  res.render("index", { widgets: widgets, reddit_url: process.env.REDDIT_URL });
});

// request endpoint to bypass CORS issues
app.post("/request", async (req: Express.Request, res: Express.Response) => {
  var result = await fetch(req.body.url, {});

  res.json(await result.json());
});

// everything else will be handled by the static controller, without caching
app.use(Express.static(path.join(__dirname, "public"), { maxAge: 0 }));

// HEY, LISTEN
app.listen(process.env.PORT);
