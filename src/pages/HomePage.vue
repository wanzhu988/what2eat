<template>
  <el-container>
    <el-aside width="300px">
      <Sidebar @menu-selected="setActiveContent" />
    </el-aside>

    <el-main>
      <div v-show="activeContent === 'FoodsILike'">
        <FoodsILike />
      </div>
      <div v-show="activeContent === 'FoodsIHave'">
        <FoodsIHave />
      </div>
      <div v-show="activeContent === 'AIWhat2Eat'">
        <p>AI What2Eat - Coming Soon!</p>
      </div>
      <div v-show="activeContent === 'MyProfile'">
        <p>My Profile - Coming Soon!</p>
      </div>
      <!-- 其他内容项 -->
    </el-main>
  </el-container>
</template>

<script>
import Sidebar from '@/components/SideBar.vue';
import FoodsILike from '@/components/FoodsILike.vue';
import FoodsIHave from '@/components/FoodsIHave.vue';

export default {
  data() {
    return {
      activeContent: 'FoodsILike',
    };
  },
  methods: {
    setActiveContent(content) {
      this.activeContent = content;
      console.log("Active Content Set To:", this.activeContent);
    },
  },
  components: {
    Sidebar,
    FoodsILike,
    FoodsIHave,
  },
};
</script>
