## About

Packet is a JavaScript library that can download the dependencies
of a web page, and afterwards display the web page with all of its
dependencies in-place, ready to use. A dependency could be a font,
an image, a script, a stylesheet, or another resource that can be
downloaded with `window.fetch`.

## Examples

```typescript
import packet, { item } from "packet";
packet(
  item.font("Kanit Regular", "url(/fonts/kanit-regular.ttf)"),
  item.script("/js/app.js"),
  item.image("/images/app.png"),
  item.css("/css/app.css"),
  item.progress((percent) => {
    console.log(`${percent}%`)
  })
).fetch()
 .then((pkg) => {
    pkg.fonts.forEach((font) => documents.fonts.add(font));
    pkg.scripts.forEach((script) => document.body.appendChild(script));
    pkg.css.forEach((css) => document.head.appendChild(css));
 })
```

## License

[BSD Zero Clause](https://choosealicense.com/licenses/0bsd/).
<br>
See [LICENSE](./LICENSE).

