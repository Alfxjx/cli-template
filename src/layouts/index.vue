<template>
  <div class="layouts">
    <el-container>
      <el-aside width="200px">
        <TheAside />
      </el-aside>
      <el-container>
        <el-header><TheHeader /></el-header>
        <el-main>
          <router-view></router-view>
          <el-footer><TheFooter /></el-footer>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import TheHeader from "./components/TheHeader.vue";
import TheAside from "./components/TheAside.vue";
import TheFooter from "./components/TheFooter.vue";
export default {
  components: {
    TheHeader,
    TheAside,
    TheFooter
  },
  data() {
    return {
      editableTabs: [
        { name: "index", link: "/index" },
        { name: "test1", link: "/test1" },
        { name: "test", link: "/test" }
      ],
      editableTabsValue: "index"
    };
  },
  methods: {
    addTab(targetName) {
      const newTabName = ++this.tabIndex + "";
      this.editableTabs.push({
        title: "New Tab",
        name: newTabName,
        content: "New Tab content"
      });
      this.editableTabsValue = newTabName;
    },
    removeTab(targetName) {
      const tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            const nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }

      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/index.scss";
.layouts {
  color: $__yellow;
  width: 100vw;
  height: 100vh;
  .el-container {
    height: 100%;
  }
  .el-header {
    padding: 0;
  }
  .el-main {
    padding: 0;
    overflow-y: scroll;
    & /deep/ .el-tabs {
      margin: 1rem 0.5rem;
    }
  }
  .el-footer {
    padding: 0;
  }
}
</style>
