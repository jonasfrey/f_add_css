import {
    O_vec4
}from "https://deno.land/x/vector@0.9/mod.js"
let f_b_valid_url = function(string) {
    let url;
    
    try {
      url = new URL(string);
    } catch (_) {
      return false;  
    }
  
    return url.protocol === "http:" || url.protocol === "https:";
  }

let f_s_css_prefixed = function(
    s_css,
    s_prefix
){
    s_css = s_css.replace(/(\r\n|\n|\r)/gm, "");
    let a_s_css = s_css.split("{")
    // console.log(s_css)
    a_s_css = a_s_css.filter(s=>s.trim()!='');
    s_css = a_s_css.map(
        function(s, n_idx){

            let n_idx_start = s.indexOf("}");
            let s_sub = s.substring(n_idx_start+1);

            if(s_sub.trim() != ''){
                s = s.replace(s_sub, s_sub.split(",").map(s=>`${s_prefix} ${s}`).join(","))
            }
            return s 
        }
    ).join("{")
    // console.log(s_css)

    return s_css;
    // return s_css.split("}").filter(s=>s.trim()!='').map(s=>`${s}}`.split(",").map(s=>`${s_prefix} ${s}`).join(',')).flat().join('\n')
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
        o_el_style.innerHTML = s_css
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

let f_s_hsla = function(o_hsla){
    return `hsla(${360*o_hsla?.[0]} ${o_hsla?.[1]*100}% ${o_hsla?.[2]*100}% / ${o_hsla?.[3]})`
}


let o_variables_light = {
    o_hsla__fg:                 new O_vec4(.0, .0, .1, .93), 
    o_hsla__fg_hover:           new O_vec4(.0, .0, .1, .93), 
    o_hsla__fg_active:          new O_vec4(.0, .0, .1, .93), 
    o_hsla__fg_active_hover:    new O_vec4(.0, .0, .1, .93), 
    
    o_hsla__bg:                 new O_vec4(.0, .0, .1, .93), 
    o_hsla__bg_hover:           new O_vec4(.0, .0, .1, .93), 
    o_hsla__bg_active:          new O_vec4(.0, .0, .1, .93), 
    o_hsla__bg_active_hover:    new O_vec4(.0, .0, .1, .93), 
}

let o_variables = {

    o_hsla__fg:                 new O_vec4(.0, .0, .8, .93), 
    o_hsla__fg_hover:           new O_vec4(.0, .0, .9, .93), 
    o_hsla__fg_active:          new O_vec4(.0, .0, .9, .93), 
    o_hsla__fg_active_hover:    new O_vec4(.0, .0, .9, .93), 
    
    o_hsla__bg:                 new O_vec4(.0, .0, .1, .93), 
    o_hsla__bg_hover:           new O_vec4(.0, .0, .2, .93), 
    o_hsla__bg_active:          new O_vec4(.0, .0, .15, .93), 
    o_hsla__bg_active_hover:    new O_vec4(.0, .0, .2, .93), 

    o_hsla_addition_vector_hover: new O_vec4(0.,0.,0.1,0.0),
    o_hsla_addition_vector_active: new O_vec4(0.,0.,0.1,0.0),
    n_rem_font_size_base: 1.6,
    a_n_factor_heading_font_size: [
        2.,1.8,1.6,1.4,1.2, 1.
    ],

    o_hsla_primary: new O_vec4(0.5, .85, 0.8,0.9), 
    o_hsla_secondary: new O_vec4(0.1, .85, 0.8,0.9) 

};

let f_s_css_from_o_variables = function(o_variables){
    let a_s_selector_clickable = [
        '.clickable', 'button', 'input', 'textarea', 'select', 'iframe'
    ]
    let a_s_state = ['','hover', 'active'];
    return `
        ${a_s_state.map(s=>{
            return `
                a${(s!='')?`:${s}`:''}{
                    ${(()=>{
                        let o_vec = o_variables.o_hsla_primary
                        if(s!=''){
                            o_vec = o_vec.add(
                                o_variables[`o_hsla_addition_vector_${s}`]
                            )
                        }
                        // console.log(o_vec)
                        return `color: ${f_s_hsla(o_vec)}`
                    })()}
                }
            `
        }).join('\n')}

        html{
            font-size: ${o_variables.n_rem_font_size_base}rem;
            font-family:helvetica;
            background: ${f_s_hsla(o_variables.o_hsla__bg)};
            color: ${f_s_hsla(o_variables.o_hsla__fg)};
        }
        ${o_variables.a_n_factor_heading_font_size.map((n,n_idx)=>{
            return `h${n_idx+1}{font-size: ${n*o_variables.n_rem_font_size_base}rem}`
        }).join('\n')}

        ${a_s_selector_clickable.map(s=>`${s}`).join(',')}{
            padding:1rem;
            border-radius:3px;
            background: ${f_s_hsla(o_variables.o_hsla__bg)};
            color: ${f_s_hsla(o_variables.o_hsla__fg)};
            font-size: inherit;
        }
        ${a_s_selector_clickable.map(s=>`${s}:hover`).join(',')}{
            background: ${f_s_hsla(o_variables.o_hsla__bg_hover)};
            color: ${f_s_hsla(o_variables.o_hsla__fg_hover)};
            cursor:pointer;
        }
        ${a_s_selector_clickable.map(s=>`${s}.clicked`).join(',')}{
            background: ${f_s_hsla(o_variables.o_hsla__bg_active)};
            color: ${f_s_hsla(o_variables.o_hsla__fg_active)};
            cursor:pointer;
        }
        ${a_s_selector_clickable.map(s=>`${s}.clicked:hover`).join(',')}{
            background: ${f_s_hsla(o_variables.o_hsla__bg_active_hover)};
            color: ${f_s_hsla(o_variables.o_hsla__fg_active_hover)};
            cursor:pointer;
        }
            

        .position_relative{
            position:relative
        }
        .o_js_s_name_month_n_year{
            position:absolute;
            top:100%;
            left:0;
            width:100%;
        }
        input, button{
            border:none;
            outline:none;
            flex: 1 1 auto;
        }
        .input{
            display:flex;
        }

        .d_flex{
            display: flex;
            flex-wrap: wrap;
        }

        .w_1_t_7{
            align-items: center;
            display: flex;
            justify-content: center;
            flex: 1 1 calc(100%/7);
        }

        .w_1_t_3{
            align-items: center;
            display: flex;
            justify-content: center;
            flex:1 1 calc(100%/3);
        }
        *{
            padding: 0;
            margin:0;
        }

        .border_shadow_popup{
            box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
        }
        .theme_dark .border_shadow_popup{
            box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
        }

        ${(new Array(20).fill(0)).map(
            function(n, n_idx){
                let num = (n_idx /10)
                let s_n = num.toString().split('.').join('_');
                return `
                    .p-${s_n}_rem{padding: ${num}rem}
                    .pl-${s_n}_rem{padding-left: ${num}rem}
                    .pr-${s_n}_rem{padding-right: ${num}rem}
                    .pt-${s_n}_rem{padding-top: ${num}rem}
                    .pb-${s_n}_rem{padding-bottom: ${num}rem}
                `
            }
        ).join("\n")} `;

};
export {
    o_variables,
    f_s_css_from_o_variables,
    f_add_css, 
    f_s_css_prefixed
}