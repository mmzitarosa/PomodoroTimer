<template>
  <div class="buttons">
    <button type="button" v-on:click="start" v-if="!isActive">Start</button>
    <button type="button" v-on:click="stop" v-else>Stop</button>
    <button type="button" v-on:click="reset">Reset</button>
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

.timer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 25vw;
}

</style>
