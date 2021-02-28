<template>
  <div class="timer">
    {{ countdown }}
  </div>
</template>

<script lang="ts">
import {Vue} from 'vue-property-decorator';

export default Vue.extend({
  data: () => ({
    nowTime: new Date().getTime(),
    countdownTime: new Date().getTime() + (25 * 60 * 1000) + 10000
  }),
  created() {
    this.start();
  },
  methods: {
    start() {
      setInterval(() => {
        this.nowTime = new Date().getTime();
      }, 1000);
    }
  },
  computed: {
    countdown() {
      this.$store.getters.timer
      let differenceTime = this.countdownTime - this.nowTime;
      let days = Math.floor(differenceTime / (1000 * 60 * 60 * 24));
      let hours = Math.floor((differenceTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes : string | number = Math.floor((differenceTime % (1000 * 60 * 60)) / (1000 * 60));
      let seconds : string | number = Math.floor((differenceTime % (1000 * 60)) / 1000);

      minutes = (minutes < 10 ? '0' : '') + minutes;
      seconds = (seconds < 10 ? '0' : '') + seconds;

      return (days > 0 ? days + " " : "") + (hours > 0 ? hours + ":" : "") + minutes + ":" + seconds;
    }
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