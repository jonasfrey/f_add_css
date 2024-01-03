<!-- {"s_msg":"this file was automatically generated","s_by":"f_generate_markdown.module.js","s_ts_created":"Wed Jan 03 2024 15:30:28 GMT+0100 (Central European Standard Time)","n_ts_created":1704292228894} -->
# import lib
```javascript
import {
    f_add_css,
    f_s_css_prefixed,
    o_variables, 
    f_s_css_from_o_variables
} from "./client.module.js"
// } from "https://deno.land/x/f_add_css@[version]/mod.js"
```
## add css by string
```javascript
            f_add_css(`
                *{
                    margin:0;
                    padding:0;
                    font-family:sans
                }
            `)
```
# add css by string, using the power of js .map and .join
```javascript
            f_add_css(
                [
                [
                    `
                    *{
                        margin:0; 
                        padding: 0;
                        color: orange;
                    }`,
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
            f_add_css(`https://cdn.simplecss.org/simple.css`);
```
# add a css to a specific document
```javascript
            f_add_css(
                '*{color:red !important}',
                document?.querySelector('iframe')?.contentWindow?.document, 
            )
```
# prefix a css string
```javascript
            let s_css = `
            p{
                color:blue
            }
            *{
                color: blue
            }
            `
            let s_css_prefixed = (
                f_s_css_prefixed(
                    s_css,
                    '.all_blue'
                )
            )
            console.log(s_css_prefixed);//.all_blue p{color:blue} .all_blue *{color: blue}  
            f_add_css(
                s_css_prefixed
            )
```
# customize
there is a also a small customizable 'theme'
```javascript
            // we need to import 
            // {
            //     o_variables, 
            //     f_s_css_from_o_variables
            // } from "https://deno.land/x/f_add_css@[version]/mod.js"

            o_variables.n_rem_font_size_base = 1. // adjust font size, other variables can also be adapted before adding the css to the dom
            o_variables.n_rem_padding_interactive_elements = 0.5; // adjust padding for interactive elements 
            f_add_css(
                f_s_css_from_o_variables(
                    o_variables
                )
            );
```