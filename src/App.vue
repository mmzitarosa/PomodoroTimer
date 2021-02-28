<template>
  <div id="app">
    <Timer/>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Timer from './components/Timer.vue';

@Component({
  components: {
    Timer
  },
})
export default class App extends Vue {}
</script>

<style>
html {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}

body {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  font-family: Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  width: 100%;
  height: 100%;
  border-radius: 15px;
  box-sizing: content-box;
  background-color: rgba(255,255,255, 0.5);
  color: black;
}
</style>
