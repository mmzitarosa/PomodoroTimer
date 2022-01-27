<template>
  <div id="app">
    <div id="content" ref="content">
      <Timer id="timer"/>
      <Buttons/>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Timer from './components/Timer.vue';
import Buttons from './components/Buttons.vue';

@Component({
  components: {
    Timer,
    Buttons
  },
  mounted() {
    setTimeout(() => {
      (this.$refs.content as HTMLElement).style.visibility = "visible";
    }, 1000)
  }
})
export default class App extends Vue {
}
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
  background-color: rgba(255, 255, 255, 0.5);
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
}
#content {
  visibility: hidden;
}
#timer {
  font-size: 25vw;
}
</style>
