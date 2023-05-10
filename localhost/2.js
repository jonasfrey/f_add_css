let f_s_html_syntax_highlighted = function(
    v_object_or_json
){
    let s_json = v_object_or_json
    if(typeof v_object_or_json != "string" ){
        s_json = JSON.stringify(v_object_or_json, null, 4)
    }

    s_json = s_json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    let s_html = s_json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });

    return `<pre class='s_html_syntax_highlighted' >${s_html}</pre>`

}

let s_css_syntax_highlight = 
`
.s_html_syntax_highlighted  { background: #1C1C1C; }
.s_html_syntax_highlighted { color: #FDF6E3; }
.s_html_syntax_highlighted .string { color: #CE916F; }
.s_html_syntax_highlighted .number { color: #AEC6A1; }
.s_html_syntax_highlighted .boolean { color: #569CD6; }
.s_html_syntax_highlighted .null { color: #569CD6; }
.s_html_syntax_highlighted .key { color: #9BDAFC; }

.theme_dark .s_html_syntax_highlighted  { background: #1C1C1C; }
.theme_dark .s_html_syntax_highlighted { color: #FDF6E3; }
.theme_dark .s_html_syntax_highlighted .string { color: #CE916F; }
.theme_dark .s_html_syntax_highlighted .number { color: #AEC6A1; }
.theme_dark .s_html_syntax_highlighted .boolean { color: #569CD6; }
.theme_dark .s_html_syntax_highlighted .null { color: #569CD6; }
.theme_dark .s_html_syntax_highlighted .key { color: #9BDAFC; }

.theme_light .s_html_syntax_highlighted  { background: #FDF6E3; }
.theme_light .s_html_syntax_highlighted { color: #1C1C1C; }
.theme_light .s_html_syntax_highlighted .string { color: #3EBCC8; }
.theme_light .s_html_syntax_highlighted .number { color: #D33682; }
.theme_light .s_html_syntax_highlighted .boolean { color: #B58900; }
.theme_light .s_html_syntax_highlighted .null { color: #B58900; }
.theme_light .s_html_syntax_highlighted .key { color: #2699D9; }
`
let f_b_valid_url = function(string) {
    let url;
    
    try {
      url = new URL(string);
    } catch (_) {
      return false;  
    }
  
    return url.protocol === "http:" || url.protocol === "https:";
  }

let f_add_css = function(
    o_document,
    s_path_file,
    s_css
){
    if(typeof o_document == 'string'){
        if(f_b_valid_url(o_document)){
            s_path_file = o_document, 
            o_document = document, 
            s_css = null
        }else{
            s_css = o_document
            o_document = document
        }
    }

    let o_el = null;
    if(s_css){
        var o_el_style = o_document.createElement("style")
        o_el_style.innerText = s_css
        o_el = o_el_style
    }else{
        o_el = o_document.createElement("link");
        o_el.rel = "stylesheet"
        o_el.href = s_path_file
        // <link rel="stylesheet" href="mystyle.css">
    }
    o_el.crossorigin="anonymous"; 

    // o_document.head.appendChild(o_el)
    o_document.head.insertBefore(o_el, o_document.head.firstChild);// this way the css will not overwrite
}

let f_append_child_with_syntax_highlight = function(
    o_element, 
    v_object_or_json, 
    s_theme = ''
){
    let o_div = document.createElement("div");
    o_div.className = s_theme
    o_div.innerHTML = f_s_html_syntax_highlighted(v_object_or_json);
    o_element.appendChild(o_div);
}

export {
    f_s_html_syntax_highlighted,
    s_css_syntax_highlight,
    f_add_css,
    f_append_child_with_syntax_highlight
}