
//./readme.md:start
//md: # import lib
import {
    f_add_css,
    f_s_css_prefixed,
} from "./client.module.js"
// } from "https://deno.land/x/f_add_css@[version]/mod.js"
//md: # most basic example add css by a string
f_add_css('*{margin:0; padding:0; font-family:sans}')
//md: # more complex string using the power of js .map and .join
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
//md: # add a css via url
f_add_css(
  'https://cdn.simplecss.org/simple.css'
)

//md: # add a css to a certain document
f_add_css(
  '*{color:red !important}',
  document.querySelector('iframe').contentWindow.document, 
)


//md: # prefix css with for example a class
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
f_add_css(
  s_css_prefixed
)

//./readme.md:end