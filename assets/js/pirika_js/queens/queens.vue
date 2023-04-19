<template>
  <div>
    <game-window />
  </div>
</template>

<script>
import store from "./packs/store";
import GameWindow from "./GameWindow.vue"

export default {
  store,
  components: {
    GameWindow,
  }
};
</script>

<style lang="scss">
@import "stylesheets/global_settings";

// このリセットを効かせたいのでここだけ scoped を外している
html,
body,
div,
span,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
abbr,
address,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
samp,
small,
strong,
sub,
sup,
var,
b,
i,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  font-size: 100%;
  vertical-align: baseline;
  background: transparent;
  box-sizing: border-box;
}

a {
  text-decoration: none;
  padding: 0px 0px;
}

body {
  user-select: none;
  font-family: "M PLUS 2", sans-serif;
  background-color: $global-bg;
}
</style>
