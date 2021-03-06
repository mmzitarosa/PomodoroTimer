<template>
  <div class="timer" :style="isWorkTime ? '' : 'color: darkred'">
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
  }),
  created() {
    setInterval(() => {
      this.now = new Date().getTime();
    }, 1000)
  },
  computed: {
    isWorkTime(): boolean {
      return this.timerService.isWorkTime();
    },
    timeToNextAlarm(): number {
      return this.timerService.getTimeToNextAlarm(this.now);
    },
    countdown() {
      let days = Math.floor(this.timeToNextAlarm / (1000 * 60 * 60 * 24));
      let hours = Math.floor((this.timeToNextAlarm % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)));
      let minutes: string | number = Math.floor((this.timeToNextAlarm % (1000 * 60 * 60) / (1000 * 60)));
      let seconds: string | number = Math.floor((this.timeToNextAlarm % (1000 * 60) / 1000));

      minutes = (minutes < 10 ? '0' : '') + minutes;
      seconds = (seconds < 10 ? '0' : '') + seconds;

      return (days > 0 ? days + " " : "") + (hours > 0 ? hours + ":" : "") + minutes + ":" + seconds;
    }
  }

});
</script>
