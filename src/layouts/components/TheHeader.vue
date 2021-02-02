<template>
  <div class="header">
    <div class="header-item">
      <i class="el-icon-search"></i>
    </div>
    <div class="header-item">
      <i class="el-icon-info"></i>
    </div>
    <div class="header-item">
      <el-avatar> u </el-avatar>
      <span>{{ username }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "张三"
    };
  }
};
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 4rem;
  box-sizing: border-box;
  padding-right: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  border-bottom: 1px solid #eee;
  &-item {
    margin: 0 0.5rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    span {
      margin-left: 0.25rem;
    }
    i {
      cursor: pointer;
    }
  }
}
</style>
