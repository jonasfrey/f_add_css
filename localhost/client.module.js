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
    v_s_css_or_s_url, 
    v_null_or_o_document = null
){
    let s_css = null; 
    let s_url = null; 
    let o_document = null;

    if(typeof v_s_css_or_s_url == 'string'){
        if(f_b_valid_url(v_s_css_or_s_url)){
            s_url = v_s_css_or_s_url; 
        }else{
            s_css = v_s_css_or_s_url
        }
    }
    if(v_null_or_o_document){
        
        o_document = v_null_or_o_document
    }else{
        o_document = document
    }
    let o_el = null;
    if(s_css){
        var o_el_style = o_document.createElement("style")
        o_el_style.innerText = s_css
        o_el = o_el_style
    }else{
        o_el = o_document.createElement("link");
        o_el.rel = "stylesheet"
        o_el.href = s_url
        o_el.crossorigin="anonymous"; 
    }

    // o_document.head.appendChild(o_el)
    o_document.head.insertBefore(o_el, o_document.head.firstChild);// this way the css will not overwrite
}

export {
    f_add_css
}