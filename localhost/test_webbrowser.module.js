
import {
    f_o_html__and_make_renderable
  } from "https://deno.land/x/f_o_html_from_o_js@2.1/mod.js"
  document.body.appendChild(await f_o_html__and_make_renderable(
    {
      a_o: [
        ...['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'a', 'span'].map(s=>{return {s_tag: s, innerText:`this is a '${s}' element`}}), 
        {
          s_tag: "iframe", 
          src: 'https://localhost:8443/localhost/client.module.js'
        }, 
        ...['clickable', 'clickable clicked'].map(s=>{return {class: s, innerText: `this is a '.${s.split(' ').join('.')}' element`}}), 
        {
          s_tag: "span", 
          class: "clickable", 
          innerText: "this is a span.clickable", 
        },
        {
          s_tag: "a", 
          class: "clickable", 
          href: "#",
          innerText: "this is a a.clickable", 
        }, 
        ...[
          'input', 'textarea',
        ].map(s=>{return {s_tag: s, value: `this is a '${s}'`}}), 
        {
          s_tag: "button", 
          innerText: 'this is a button'
        },
        {
          s_tag: "input", 
          type: "range", 
          min: 0, 
          max: 1., 
          step:0.01
        }, 
        {s_tag: "h1", innerText: "hello"},
        {s_tag: "p", innerText: "this is a story"},
        {
          s_tag: "textarea", 
          class: 'element',
          value: "text \n area"
        }, 
      ]
    }
  ))

import {
    f_display_test_selection_or_run_selected_test_and_print_summary,
    f_o_test
} from "https://deno.land/x/deno_test_server_and_client_side@1.1/mod.js"


//./readme.md:start
//md: # import lib
import {
    f_add_css,
    f_s_css_prefixed,
    o_variables, 
    f_s_css_from_o_variables
} from "./client.module.js"
// } from "https://deno.land/x/f_add_css@[version]/mod.js"
//./readme.md:end

let a_o_test = [
    f_o_test(
        "add_some_css", 
        async()=>{
            //./readme.md:start
            //md: ## add css by string
            f_add_css(`
                *{
                    margin:0;
                    padding:0;
                    font-family:sans
                }
            `)
            //./readme.md:end
        }
    ),
    f_o_test(
        "interpolated_css_string", 
        async()=>{
            //./readme.md:start
            //md: # add css by string, using the power of js .map and .join
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
            //./readme.md:end
        }
    ),
    f_o_test(
        "add a css via url", 
        async()=>{
            //./readme.md:start
            //md: # add a css via url
            f_add_css(`https://cdn.simplecss.org/simple.css`);
            //./readme.md:end
        }
    ),
    f_o_test(
        "add_css_to_spcific_doc", 
        async()=>{
            //./readme.md:start
            //md: # add a css to a specific document
            f_add_css(
                '*{color:red !important}',
                document?.querySelector('iframe')?.contentWindow?.document, 
            )
            //./readme.md:end
        }
    ),
    f_o_test(
        "prefix_a_css_string_with_a_prefix", 
        async()=>{
            //./readme.md:start
            //md: # prefix a css string 
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
            //./readme.md:end
        }
    ),
    f_o_test(
        "add_some_css", 
        async()=>{
            //./readme.md:start
            //md: # customize 
            //md: there is a also a small customizable 'theme'
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
            //./readme.md:end
        }
    ),
]


f_display_test_selection_or_run_selected_test_and_print_summary(
    a_o_test
)