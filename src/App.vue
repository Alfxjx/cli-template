<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import "./styles/index.scss";
body {
  margin: 0;
}
html {
  // hide x axis scroll bar
  overflow-x: hidden;
  overflow-y: auto;
}
@media (max-width: 768px) {
  html {
    font-size: 12px;
  }
}
#app {
  width: 100vw;
  height: 100vh;
}
</style>
