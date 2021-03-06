<template>
  <div class="buttons">
    {{ tomatoCounter }}
    <span class="timer-buttons">
      <a v-on:click="start" v-if="!isActive" style="color: green">Start</a>
      <a type="button" v-on:click="stop" v-else style="color: darkred">Stop</a>
      <a type="button" v-on:click="reset">Reset</a>
    </span>
  </div>
</template>

<script lang="ts">
import {Vue} from 'vue-property-decorator';
import TimerService from "@/services/TimerService";

export default Vue.extend({
  data: () => ({
    timerService: TimerService.getInstance()
  }),
  computed: {
    tomatoCounter(): number {
      return this.timerService.getTomatoCounter();
    },
    isActive(): boolean {
      return this.timerService.isActive();
    }
  },
  methods: {
    start() {
      this.timerService.start();
    },
    stop() {
      this.timerService.stop();
    },
    reset() {
      this.timerService.reset();
    },
  }
});
</script>

<style>
.buttons {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.timer-buttons {
  text-align: right;
}

.buttons a {
  margin-left: 16px;
  cursor: pointer;
}
</style>
