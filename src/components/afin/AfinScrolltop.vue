<template>
  <div class="top-wrapper" v-show="showTop" @click="toTop">
    <div class="top-icon">
      <img class="icon-img" :src="computedImg" alt="top" />
    </div>
  </div>
</template>

<script>
export default {
  name: "top",
  props:{
      img:{
          type: String,
          default: "top"
      }
  },
  data() {
    return {
      scrollTop: 0,
      time: 0,
      dParams: 20,
      scrollState: 0
    };
  },
  computed: {
    computedImg() {
      return require(`../assets/img/${this.img}.png`);
    },
    showTop: function() {
      if (this.scrollTop > 200) {
        return true;
      } else {
        return false;
      }
    }
  },
  mounted() {
    window.addEventListener("scroll", this.getScrollTop);
  },
  methods: {
    toTop(e) {
      if (this.scrollState) {
        return;
      }
      this.scrollState = 1;
      e.preventDefault();
      // let distance = document.documentElement.scrollTop || document.body.scrollTop
      const _this = this;
      this.time = setInterval(function() {
        _this.gotoTop(_this.scrollTop - _this.dParams);
      }, 10);
    },
    gotoTop(distance) {
      this.dParams += 20;
      distance = distance > 0 ? distance : 0;
      document.documentElement.scrollTop = document.body.scrollTop = window.pageYOffset = distance;
      if (this.scrollTop < 10) {
        clearInterval(this.time);
        this.dParams = 20;
        this.scrollState = 0;
      }
    },
    getScrollTop() {
      this.scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
    }
  }
};
</script>

<style lang="scss" scoped>
.top-icon {
  background: white;
  //   border-radius: 50%;
  padding: 0.5em 0.7em;
  //   box-shadow: 0 3px 2px 2px rgba(121, 121, 121, 0.26);
}
.icon-img {
  width: 1.3em;
  height: 1.3em;
}
.top-wrapper {
  position: fixed;
  bottom: 60px;
  right: 45px;
  z-index: 20;
}
</style>
