import { name } from "./name.js";
import { hello } from "./hello.js";

export default function message() {
    console.log(`${hello} ${name}!`);
}