<template>
  <div class="buttons">
    <button type="button" v-on:click="start" v-if="!isActive">Start</button>
    <button type="button" v-on:click="stop" v-else>Stop</button>
    <button type="button" v-on:click="reset">Reset</button>
  </div>
</template>

<script lang="ts">
import {Vue} from 'vue-property-decorator';
import {WORK_TIME} from "@/constant";
import {State} from "@/store";

export default Vue.extend({
  data: () => ({
  }),
  computed: {
    isActive(): boolean {
      return this.$store.getters.isActive;
    },
    nextAlarmTime(): number | undefined {
      return this.$store.getters.nextAlarmTime;
    },
    lastTime(): number | undefined {
      return this.$store.getters.lastTime;
    },
    lastDifference(): number | undefined {
      if (this.nextAlarmTime && this.lastTime)
        return this.nextAlarmTime - this.lastTime;
      return undefined;
    }
  },
  methods: {
    start() {
      this.$store.commit(
          "startTimer",
          {
            nextAlarmTime: new Date().getTime() + (this.lastDifference ? this.lastDifference : WORK_TIME),
            state: State.WORK
          }
      );
    },
    stop() {
      this.lastTime = new Date().getTime();
      this.$store.commit("stopTimer");
    },
    reset() {
      this.$store.commit("resetTimer");
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
