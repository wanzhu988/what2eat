<template>
    <div class="shell">
      <ul class="nav">
        <li class="active" id="logo" @click="setActive(0)">
          <a href="#">
            <div class="icon">
              <div class="imageBox">
                <img src="@/assets/logo.png" alt="Logo" />
              </div>
            </div>
            <div class="text">WHAT2EAT</div>
          </a>
        </li>
        <li v-for="(item, index) in menuItems" :key="index" :class="{ active: activeIndex === index }" @click="setActive(index)">
          <a :href="item.href">
            <div class="icon">
                <img :src="item.iconSrc" alt="" class="icon-img" />
            </div>
            <div class="text">{{ item.text }}</div>
          </a>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        activeIndex: 0,
        menuItems: [
        { text: "Foods I like", iconSrc: require("@/assets/Foods I like.png")},
        { text: "Foods I have", iconSrc: require("@/assets/Foods I have.png") },
        { text: "AI What2Eat", iconSrc: require("@/assets/AI Chatbot.png") },
        { text: "My Profile", iconSrc: require("@/assets/My Profile.png") },
        ],
      };
    },
    methods: {
      setActive(index) {
        this.activeIndex = index; // 这里直接传递标识符，而不是动态生成的字符串
        let contentMap = {
          0: 'FoodsILike',
          1: 'FoodsIHave',
          2: 'AIWhat2Eat',
          3: 'MyProfile'
        };
        this.$emit('menu-selected', contentMap[index]);
      },
    }
  };
  </script>
  
  <style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style: none;
    text-decoration: none;
  }
  
  body {
    background: #e4e9f5;
  }
  
  section {
    position: relative;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font: 900 100px '';
    color: rgba(110, 90, 240, 0.3);
    background: #e4e9f5;
  }
  
  .shell {
    position: fixed;
    width: 84px;
    height: 100%;
    background: #fff;
    z-index: 9999;
    transition: width 0.5s;
    padding-left: 10px;
    overflow: hidden;
  }
  
  .shell:hover {
    width: 300px;
  }
  
  .imageBox {
    position: relative;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
  }
  
  .imageBox img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .shell ul {
    position: relative;
    height: 100vh;
  }
  
  .shell ul li {
    position: relative;
    padding: 5px;
  }
  
  .active {
    background: #e4e9f5;
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;
  }
  
  .active::before {
    content: "";
    position: absolute;
    top: -30px;
    right: 0;
    width: 30px;
    height: 30px;
    border-bottom-right-radius: 25px;
    box-shadow: 5px 5px 0 5px #e4e9f5;
    background: transparent;
  }
  
  .active::after {
    content: "";
    position: absolute;
    bottom: -30px;
    right: 0;
    width: 30px;
    height: 30px;
    border-top-right-radius: 25px;
    box-shadow: 5px -5px 0 5px #e4e9f5;
    background: transparent;
  }
  
  #logo {
    margin: 40px 0 100px 0;
  }
  
  .shell ul li a {
    position: relative;
    display: flex;
    white-space: nowrap;
  }
  
  .icon {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 60px;
    padding-left: 10px;
    height: 70px;
    color: #333;
    transition: 0.5s;
    color: rgb(110, 90, 240);
  }
  
  .icon i {
    font-size: 20px;
    z-index: 999;
  }
  
  .text {
    position: relative;
    height: 70px;
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #333;
    padding-left: 15px;
    text-transform: uppercase;
    letter-spacing: 2px;
    transition: 0.5s;
  }
  
  .shell ul li:hover a .icon,
  .shell ul li:hover a .text {
    color: #ffa117;
  }
  
  .active a .icon::before {
    content: "";
    position: absolute;
    inset: 5px;
    width: 60px;
    background: #fff;
    border-radius: 50%;
    transition: 0.5s;
    border: 7px solid rgb(110, 90, 240);
    box-sizing: border-box;
  }

  .icon-img {
  width: 30px;
  height: 30px;
  object-fit: cover;
  }

  </style>
  