<!-- {"s_msg":"this file was automatically generated","s_by":"f_generate_markdown.module.js","s_ts_created":"Wed May 10 2023 14:26:39 GMT+0200 (Central European Summer Time)","n_ts_created":1683721599257} -->
# import lib
```javascript
import {
    f_add_css,
} from "./client.module.js"
// } from "https://deno.land/x/f_add_css@[version]/mod.js"
```
# most basic example add css by a string
```javascript
f_add_css('*{margin:0; padding:0; font-family:sans}')
```
# more complex string using the power of js .map and .join
```javascript
f_add_css(
  [
    `*{
      margin:0; 
      padding: 0;
      color: orange;
    }`,
    [
      `
        p{color:red}
      `, 
      `
        h2{color:blue}
      `, 
    ].map(s=>`.my_prefix_class ${s}`).join("\r\n")
  ].join('r\n')
)
```
# add a css via url
```javascript
f_add_css(
  'https://cdn.simplecss.org/simple.css'
)

```
# add a css to a certain document
```javascript
f_add_css(
  '*{color:red !important}',
  document.querySelector('iframe').contentWindow.document, 
)

```