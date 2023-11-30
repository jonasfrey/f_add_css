import { 
  o_variables, 
  f_s_css_from_o_variables,
  f_add_css,
} from "./client.module.js"

// o_variables.n_rem_font_size_base = 1.2
f_add_css(
  f_s_css_from_o_variables(
    o_variables
  )
);
