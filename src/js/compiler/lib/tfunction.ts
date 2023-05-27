import { readFileSync } from "fs";
import { join } from "path";

export default function(locale: string) {
  const path = join(process.cwd(), "public", "i18n", `${locale}.json`);
  const str = readFileSync(path).toString();
  const table = JSON.parse(str);
  return (key: string) => table[key];
}
