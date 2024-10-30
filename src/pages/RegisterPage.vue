<template>
    <div class="container">
      <!-- 左侧背景 -->
      <div class="background-section">
        <h1>WHAT</h1>
        <h1>2</h1>
        <h1>EAT</h1>
      </div>
  
      <!-- 右侧注册框 -->
      <div class="form-section">
        <div class="form-container">
          <div class="register-box">
            <el-form :model="registerForm" @submit.prevent="onRegister">
              <h2>Register</h2>
              <el-form-item>
                <el-input v-model="registerForm.username" placeholder="Username" style="width: 100%;"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input v-model="registerForm.email" placeholder="Email" style="width: 100%;"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input type="password" v-model="registerForm.password" placeholder="Password" style="width: 100%;"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input type="password" v-model="registerForm.confirmPassword" placeholder="Confirm Password" style="width: 100%;"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onRegister" style="width: 100%;">Register</el-button>
              </el-form-item>
              <p class="login-link">
                Already have an account?
                <a href="/login">Login</a>
              </p>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
<script>
import axios from 'axios';

export default {
  data() {
    return {
      registerForm: {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    };
  },
  methods: {
    async onRegister() {
      if (this.registerForm.password !== this.registerForm.confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      try {
        const response = await axios.post('http://localhost:8000/users/register', {
          username: this.registerForm.username,
          useremail: this.registerForm.email,  
          userpassword: this.registerForm.password
        }, {
        headers: {
            'Content-Type': 'application/json'
          }
        }
      );
        console.log("Registration successful:", response.data);
        // this.$router.push('/login');
      } catch (error) {
        console.error("Registration failed:", error.response ? error.response.data : error.message);
      }
    }
  }
};
  </script>
  
  <style scoped>
  /* 全局设置：确保无滚动条和边距 */
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  
  html, body {
  width: 100%;
  height: 100%;
  padding: 0 !important;
  margin: 0 !important;
  overflow: hidden;
}
  .container {
    display: flex;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }

  .background-section {
    flex: 1;
    background: linear-gradient(rgba(0, 0, 0, 0.4), #00000066), url('@/assets/Food Set.jpg') center/cover no-repeat;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 48px;
    font-weight: bold;
  }
  
  .form-section {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #FED8B1;
  }
  
  .register-box {
    width: 500px;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: white;
    text-align: center;
  }
  
  .register-box h2 {
    margin-bottom: 20px;
    color: #333;
  }
  
  .background-section h1 {
    margin: 0;
    line-height: 1;
  }
  
  .login-link {
    margin-top: 20px;
    font-size: 14px;
    color: #666;
  }
  
  .login-link a {
    color: #007bff;
    text-decoration: none;
  }
  
  .login-link a:hover {
    text-decoration: underline;
  }
  </style>
  