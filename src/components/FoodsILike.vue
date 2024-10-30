<template>
  <div>
    <el-row :gutter="20">
      <!-- 左边的表格部分 -->
      <el-col :span="12">
        <div class="table-actions">
          <el-button type="success" @click="openAddDialog">Add Food</el-button>
        </div>
        <el-table :data="foods" @selection-change="handleSelectionChange" style="width: 100%">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="food_name" label="Name" width="180"></el-table-column>
          <el-table-column prop="food_type" label="Type" width="180"></el-table-column>
          <el-table-column label="Actions" width="150">
            <template v-slot="scope">
              <el-button @click="openEditDialog(scope.row)" type="primary" size="small">Edit</el-button>
              <el-button @click="deleteFood(scope.row.food_id)" type="danger" size="small">Delete</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>

      <!-- 右边的转盘部分 -->
      <el-col :span="12" style="position: relative;">
        <div class="wheel-pointer">
          <i class="el-icon-arrow-up"></i>
        </div>
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

      <!-- 添加和编辑对话框 -->
      <el-dialog v-model="dialogVisible" title="Add Food">
        <el-form :model="form" label-width="80px">
          <el-form-item label="Name">
            <el-input v-model="form.food_name"></el-input>
          </el-form-item>
          <el-form-item label="Type">
            <el-select v-model="form.food_type" placeholder="Select Food Type">
              <el-option label="Breakfast" value="breakfast"></el-option>
              <el-option label="Lunch" value="lunch"></el-option>
              <el-option label="Dinner" value="dinner"></el-option>
              <el-option label="Any" value="any"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="saveFood">Save</el-button>
        </template>
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
import { LuckyWheel } from '@lucky-canvas/vue';
import axios from 'axios';

export default {
  name: "FoodsILike",
  components: {
    LuckyWheel,
  },
  data() {
    return {
      foods: [],
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
      dialogVisible: false,
      form: { food_id: null, food_name: '', food_type: '' }, // 修复 form 字段名
    };
  },
  methods: {
    async fetchFoodsILike() {
      const userId = localStorage.getItem('user_id');
      if (!userId) {
        console.error("User ID is missing.");
        return;
      }
      try {
        const response = await axios.get(`http://localhost:8000/foodsilike/get`, {
          params: { user_id: userId }
        });
        console.log("Fetched foods:", response.data);
        this.foods = response.data;
      } catch (error) {
        console.error("Failed to fetch foods:", error);
      }
    },
    openAddDialog() {
      this.form = { food_id: null, food_name: '', food_type: '' };
      this.dialogVisible = true;
    },
    openEditDialog(food) {
      this.form = { ...food }; // 确保 food_id 被传递
      this.dialogVisible = true;
    },
    async saveFood() {
      const userId = localStorage.getItem('user_id');
      const payload = {
        food_name: this.form.food_name,
        food_type: this.form.food_type
      };

      try {
        if (this.form.food_id) {  // 使用 food_id 判断是否为编辑操作
          await axios.put(`http://localhost:8000/foodsilike/put/${this.form.food_id}?user_id=${userId}`, payload);
        } else {  // 否则为新增
          await axios.post(`http://localhost:8000/foodsilike/post?user_id=${userId}`, payload);
        }
        this.dialogVisible = false;
        this.fetchFoodsILike();
      } catch (error) {
        console.error("Failed to save food:", error);
      }
    },
    async deleteFood(id) {
      try {
        await axios.delete(`http://localhost:8000/foodsilike/delete/${id}`);
        this.fetchFoodsILike();
      } catch (error) {
        console.error("Failed to delete food:", error);
      }
    },
    handleSelectionChange(selection) {
      this.selectedFoods = selection;
      this.wheelPrizes = this.selectedFoods.map((food, index) => ({
        text: food.food_name,
        background: this.getPrizeBackground(index),
        fonts: [{ text: food.food_name, top: '50%', fontColor: '#000', fontSize: '16px' }],
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
  mounted() {
    this.fetchFoodsILike();
  }
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
.table-actions {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}
</style>
