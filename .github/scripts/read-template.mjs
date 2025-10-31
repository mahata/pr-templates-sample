import fs from "node:fs";
import path from "node:path";

const key = process.env.TEMPLATE_KEY;
if (!key) {
  process.stdout.write("content=TEMPLATE_KEY is not set\n");
  process.exit(0);
}

const templatePath = path.join(".github", "PULL_REQUEST_TEMPLATE", `${key}.md`);
if (!fs.existsSync(templatePath)) {
  process.stdout.write(`content=Template not found: ${templatePath}\n`);
  process.exit(0);
}

const fileContents = fs.readFileSync(templatePath, "utf8").replaceAll("\r", "");
const escaped = fileContents.split("\n").map(line => line.replaceAll('"', '\\"'));
const content = escaped.join("\\n");
process.stdout.write(`content=${content}\n`);
