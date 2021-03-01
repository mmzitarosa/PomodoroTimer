<template>
  <div class="timer">
    {{ countdown }}
  </div>
</template>

<script lang="ts">
import {Vue} from 'vue-property-decorator';
import {BREAK_TIME, WORK_TIME} from "@/constant";
import {State} from "@/store";

export default Vue.extend({
  data: () => ({
    nowTime: new Date().getTime(),
    lastDifference: <number | undefined>undefined
  }),
  created() {
    this.start();
  },
  methods: {
    start() {
      setInterval(() => {
        this.nowTime = new Date().getTime();
      }, 1000);
    },
    startBreak() {
      this.$store.commit(
          "startTimer",
          {
            nextAlarmTime: new Date().getTime() + BREAK_TIME,
            state: State.BREAK
          }
      );
    },
    startWork() {
      this.$store.commit(
          "startTimer",
          {
            nextAlarmTime: new Date().getTime() + WORK_TIME,
            state: State.WORK
          }
      );
      this.$store.commit("incrementTomatoes");
    }
  },
  computed: {
    isActive(): boolean {
      return this.$store.getters.isActive;
    },
    isWorkTime(): boolean {
      return this.$store.getters.state != State.BREAK;
    },
    nextAlarmTime(): number | undefined {
      return this.$store.getters.nextAlarmTime;
    },
    lastTime(): number | undefined {
      return this.$store.getters.lastTime;
    },
    difference(): number {
      if (this.isActive && this.nextAlarmTime) {
        this.lastDifference = this.nextAlarmTime - this.nowTime;
      } else if (!this.lastDifference || !this.nextAlarmTime) {
        this.lastDifference = WORK_TIME;
      }

      if (this.lastDifference <= 0) {
        if (this.isWorkTime) {
          this.startBreak();
          this.lastDifference = BREAK_TIME;
        } else {
          this.startWork();
          this.lastDifference = WORK_TIME;
        }
      }
      return this.lastDifference;
    },
    countdown() {
      let days = Math.floor(this.difference / (1000 * 60 * 60 * 24));
      let hours = Math.floor((this.difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes: string | number = Math.floor((this.difference % (1000 * 60 * 60)) / (1000 * 60));
      let seconds: string | number = Math.floor((this.difference % (1000 * 60)) / 1000);

      minutes = (minutes < 10 ? '0' : '') + minutes;
      seconds = (seconds < 10 ? '0' : '') + seconds;

      return (days > 0 ? days + " " : "") + (hours > 0 ? hours + ":" : "") + minutes + ":" + seconds;
    }
  }

});
</script>

<style>


</style>
