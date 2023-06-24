## About

Postman is a TypeScript library that can download the dependencies <br>
of a web page, and afterwards display the web page with all of its <br>
dependencies in-place, ready to use. <br>

An example of a dependency could be a font, an image, a script, <br> 
a stylesheet, and a JSON blob. Other formats can be downloaded <br>
as plain-text. <br>

## Examples

### Progress bar

The following example demonstrates how postman can be used to download <br>
fonts, images, scripts, and stylesheets. The progress of the download is <br>
reported in `span.percent`. When the download is complete the text <br>
"Done" will replace the progress tracked in `span.percent`: <br>

**/index.html**

```html
<!DOCTYPE html>
<head>
  <title>Example page</title>
  <script type="module" src="/postman.js"></script>
</head>
<body>
  <h1> Loading ... <span class="percent"></span></h1>
</body>
</html>
```

**/postman.js**

```typescript
import postman, { item } from "postman";
postman(
  item.font("Kanit Regular", "url(/fonts/kanit-regular.ttf)"),
  item.script("/js/app.js"),
  item.image("/images/app.png"),
  item.css("/css/app.css"),
  item.progress((percent) => {
    const span = document.querySelector("h1 .percent");
    span.innerText = `${percent}%`;
  })
).fetch()
 .then((pkg) => {
    const h1 = document.querySelector("h1");
    pkg.fonts.forEach((font) => documents.fonts.add(font));
    pkg.scripts.forEach((script) => document.body.appendChild(script));
    pkg.css.forEach((css) => document.head.appendChild(css));
    h1.innerText = "Done";
 })
```

## License

[BSD Zero Clause](https://choosealicense.com/licenses/0bsd/).
<br>
See [LICENSE](./LICENSE).

