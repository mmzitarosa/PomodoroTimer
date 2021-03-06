<template>
  <div class="timer">
    {{ countdown }}
  </div>
</template>

<script lang="ts">
import {Vue} from 'vue-property-decorator';
import {BREAK_TIME, WORK_TIME} from "@/constant";
import TimerService from "@/services/TimerService";

export default Vue.extend({
  data: () => ({
    timerService: TimerService.getInstance(),
    now: <number>new Date().getTime(),
    // lastUpdate: <number | undefined>undefined,
    // nextAlarm: <number | undefined>undefined
  }),
  created() {
    setInterval(() => {
      this.now = new Date().getTime();
    }, 1000)
  },
  computed: {
    isActive(): boolean {
      return this.timerService.isActive();
    },
    isWorkTime(): boolean {
      return this.timerService.isWorkTime();
    },
    timeToNextAlarm(): number | undefined {
      // if (!this.lastUpdate || this.now !== this.lastUpdate) {
      //   this.nextAlarm = this.timerService.getTimeToNextAlarm();
      //   this.lastUpdate = this.now;
      // }
      // return this.nextAlarm;
      return this.timerService.getTimeToNextAlarm(this.now);
    },
    difference(): number {
      if (this.timeToNextAlarm) {
        return this.timeToNextAlarm;
      } else if (this.isWorkTime) {
        return WORK_TIME;
      }
      return BREAK_TIME;
    },
    countdown() {
      let days = Math.floor(this.difference / (60 * 60 * 24));
      let hours = Math.floor((this.difference % (60 * 60 * 24)) / (60 * 60));
      let minutes: string | number = Math.floor((this.difference % (60 * 60)) / (60));
      let seconds: string | number = Math.floor((this.difference % (60)));

      minutes = (minutes < 10 ? '0' : '') + minutes;
      seconds = (seconds < 10 ? '0' : '') + seconds;

      return (days > 0 ? days + " " : "") + (hours > 0 ? hours + ":" : "") + minutes + ":" + seconds;
    }
  }

});
</script>
