<template>
  <div>
    <el-row :gutter="20">
      <!-- 左边的表格部分 -->
      <el-col :span="12">
        <el-table :data="foods" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="name" label="Name" width="180"></el-table-column>
          <el-table-column prop="type" label="Type" width="180"></el-table-column>
        </el-table>
      </el-col>

      <!-- 右边的转盘部分 -->
      <el-col :span="12">
        <lucky-wheel
          ref="luckyWheel"
          :width="300"
          :height="300"
          :prizes="wheelPrizes"
          :buttons="wheelButtons"
          @start="handleStart"
          @end="handleEnd"
        />
        <el-button @click="startSpin" type="primary" style="margin-top: 20px;">Spin</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { LuckyWheel } from '@lucky-canvas/vue';

export default {
  name: "FoodsILike",
  components: {
    LuckyWheel,
  },
  data() {
    return {
      foods: [
        { name: "Pizza", type: "Dinner" },
        { name: "Sandwich", type: "Lunch" },
        { name: "Pancake", type: "Breakfast" },
      ],
      wheelPrizes: [
        { text: "Chicken", background: '#ff9999' },
        { text: "Grape", background: '#99ccff' },
        { text: "Water", background: '#99ff99' },
      ],
      wheelButtons: [
        {
          radius: '40%',
          text: 'Start',
          background: '#ff8a00',
          fonts: [{ text: 'Start', fontColor: '#fff', fontSize: '20px' }],
        },
      ],
    };
  },
  methods: {
    startSpin() {
      if (this.$refs.luckyWheel) {
        this.$refs.luckyWheel.play();
      }
    },
    handleStart() {
      console.log("Spin started");
    },
    handleEnd(prize) {
      this.$message.success(`You got: ${prize.fonts[0].text}`);
    },
  },
};
</script>

<style scoped>
/* 样式根据需要添加 */
</style>
