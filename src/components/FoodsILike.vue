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
      <el-col :span="12" style="position: relative;">
        <!-- 添加指针 -->
        <div class="wheel-pointer">
          <i class="el-icon-arrow-up"></i>
        </div>
        <!-- 转盘组件 -->
        <lucky-wheel
          ref="luckyWheel"
          :width="300"
          :height="300"
          :prizes="wheelPrizes"
          :buttons="wheelButtons"
          @start="handleStart"
          @end="handleEnd"
          @click="startSpin"  
        />
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
      selectedFoods: [], 
      wheelPrizes: [],
      wheelButtons: [
        {
          radius: '20%', 
          text: 'Start',
          background: '#ff8a00',
          fonts: [{ text: 'Start', fontColor: '#fff', fontSize: '16px' }], 
        },
      ],
    };
  },
  methods: {
    handleSelectionChange(selection) {
      this.selectedFoods = selection;

      this.wheelPrizes = this.selectedFoods.map((food, index) => ({
        text: food.name,
        background: this.getPrizeBackground(index),
        fonts: [
          { text: food.name, top: '50%', fontColor: '#000', fontSize: '16px' },
        ],
      }));
    },

    getPrizeBackground(index) {
      const colors = ['#ff9999', '#99ccff', '#99ff99', '#ffcc99'];
      return colors[index % colors.length];
    },

    startSpin() {
      if (this.wheelPrizes.length === 0) {
        this.$message.warning("Please select at least one food item before spinning.");
        return;
      }
      if (this.$refs.luckyWheel) {
        this.$refs.luckyWheel.play();

        setTimeout(() => {
          const prizeIndex = Math.floor(Math.random() * this.wheelPrizes.length);
          this.$refs.luckyWheel.stop(prizeIndex);
        }, 1000 + Math.random() * 2000);
      }
    },

    handleStart() {
      console.log("Spin started");
    },

    handleEnd(prize) {
      this.$message.success(`You got: ${prize.text}`);
    },
  },
};
</script>

<style scoped>
.wheel-pointer {
  position: absolute;
  top: -100px; 
  left: 50%;
  transform: translateX(-50%);
  font-size: 40px; 
  color: black;
  z-index: 9999; 
}
</style>
