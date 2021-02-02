<template>
  <div class="browser-tab" v-show="tabs.length > 0">
    <div
      class="item"
      v-for="(item, index) in tabs"
      :key="item.name"
      @click="goTo(index)"
      :class="[index === active ? 'active' : '']"
    >
      <i v-show="index === active" class="icon"></i>
      <span class="name">{{ item.name }}</span>
      <div v-if="item.show" class="close" @click.stop="deleteItem(index)">
        <i class="el-icon-close"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  methods: {
    goTo(index) {
      console.log("inside index " + index);
      this.$emit("update:active", index);
      this.$nextTick(() => {
        this.$router.push(this.tabs[this.active].link);
        console.log(this.tabs[this.active].name);
      });
    },
    deleteItem(index) {
      this.$emit("delete-item", index);
      this.$nextTick(() => {
        if (this.tabs.length <= 0) {
          this.$router.push("/");
        }
        this.$router.push(this.tabs[this.active].link);
        console.log(this.tabs[this.active].name);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.browser-tab {
  display: flex;
  // overflow-x: scroll;
  align-items: center;
  width: 100%;
  padding: 0.5rem 1rem;
  box-sizing: border-box;
  box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.03);
  .item {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 0 0.25rem;
    border: 1px solid #d8dce5;
    border-radius: 0.25rem;
    padding: 0.2rem 0.5rem;
    background: #fff;
    color: #1d6fa6;
    &.active {
      background: #1d6fa6;
      color: #fff;
    }
    .icon {
      width: 0.5rem;
      height: 0.5rem;
      background: #fff;
      border-radius: 50%;
    }
    .name {
      margin: 0 0.5rem;
      line-height: 1.5;
    }
    .close {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      height: 1rem;
      width: 1rem;
      font-size: 0.75rem;
      &:hover {
        background: #b4bccc;
        cursor: pointer;
      }
    }
  }
}
</style>
