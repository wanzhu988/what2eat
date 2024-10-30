<template>
  <div class="container">
    <!-- 左侧背景 -->
    <div class="background-section">
      <h1>WHAT</h1>
      <h1>2</h1>
      <h1>EAT</h1>
    </div>
    <!-- 右侧登录框 -->
      <div class="form-section">
        <div class="login-box">
          <el-form :model="loginForm" @submit.prevent="onLogin">
            <h2>Login</h2>
            <el-form-item>
              <el-input v-model="loginForm.email" placeholder="Email" style="width: 100%;"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input type="password" v-model="loginForm.password" placeholder="Password" style="width: 100%;"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onLogin" style="width: 100%;">Login</el-button>
            </el-form-item>
            <p class="register-link">
              Don't have an account?
              <a href="/register">Register</a>
            </p>
          </el-form>
        </div>
    </div>


  </div>
</template>


<script>
import axios from 'axios';
export default {
  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      }
    };
  },
  methods: {
    async onLogin() {
      try {
        const response = await axios.post('http://localhost:8000/users/login', this.loginForm);
        console.log("Login successful:", response.data);

        localStorage.setItem("username", response.data.username);
        const userId = response.data.user_id; // 获取 user_id
        localStorage.setItem('user_id', userId); // 存储 user_id
        
        this.$router.push('/home');
      } catch (error) {
        console.error("Login failed:", error.response ? error.response.data : error.message);
      }
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  height: 100vh;
}

.background-section, .form-section {
  flex: 1;
}

.form-section {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #FED8B1;
}
.login-box {
  width: 500px;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: white;
  text-align: center;
}
.login-box h2 {
  margin-bottom: 20px;
  color: #333;
}
.background-section {
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('@/assets/Food Set.jpg') center/cover no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 48px;
  font-weight: bold;
}
.background-section h1 {
  margin: 0;
  line-height: 1;
}
.register-link {
  margin-top: 20px;
  font-size: 14px;
  color: #666;
}
.register-link a {
  color: #007bff;
  text-decoration: none;
}
.register-link a:hover {
  text-decoration: underline;
}
</style>
