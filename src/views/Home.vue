<template>
  <div class="home-container h-screen absolute inset-0 flex flex-col" :style="{ backgroundImage: 'url(' + require('@/assets/img/bc.jpg') + ')', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }">
    <!-- 顶部导航栏 -->
    <header class="navbar bg-primary/80 backdrop-blur-sm text-white h-16 flex items-center justify-between px-6 pr-20">
      <h1 class="font-inter font-bold text-[16px] pt-20">2025年7月1日 08:45 AM</h1>
      <div class="user-info  flex justify-end gap-3">
      <img src="@/assets/icons/avatar.png" class="w-7 h-7 rounded-2xl object-cover " alt="用户头像">
      <div class="text-left flex text-right ">
        <div class="text-sm font-medium w-10 ">徐艺博</div>
        <div class="text-xs opacity-80 w-10">早班 · 08:00-16:30</div>
      </div>
      <h1 class="font-inter font-bold text-[16px] text-center">请将 AI 模型视为辅助工具，其输出需经人工核验与逻辑校准。
</h1>
    </div>
    </header>

    <!-- 主标题区域
    <div class="title-section px-6 pt-3 pb-1">
      <h2 class="font-inter font-bold text-[22px] leading-[1.2] tracking-[-0.02em]">维修服务</h2>
      <p class="font-inter text-[14px] text-gray-600 mt-1">选择需要的服务类型</p>
    </div> -->

    <!-- 图标网格区域 -->
    <div class="icon-grid x-8 pt-20 pb-8 h-50 relative z-10  items-center  ">
      <!-- 故障诊断 -->
      <div class="icon-card pt-20 h-30" @click="goTo('/diagnose')">
<!-- 修改HTML部分 -->
      <div class="icon-container bg-white/70 backdrop-blur-sm p-3 rounded-2xl flex justify-center items-center mb-2 h-30">
        <img src="@/assets/icons/fx.png" class="w-12 h-12 text-diagnose" alt="故障诊断"/>
      </div>
        <h3 class="font-inter font-medium text-[14px] text-center">故障诊断</h3>
      </div>

      <!-- 工具库 -->
      <div class="icon-card" @click="goTo('/tools')">
        <div class="icon-container bg-white/70 backdrop-blur-sm p-3 rounded-2xl flex items-center justify-center mb-2">
          <img src="@/assets/icons/gj.png" class="w-12 h-12 text-tools" alt="工具库"/>
        </div>
        <h3 class="font-inter font-medium text-[14px] text-center">工具集合</h3>
      </div>

      <!-- 维修教程 -->
      <div class="icon-card" @click="goTo('/tutorials')">
        <div class="icon-container bg-white/70 backdrop-blur-sm p-3 rounded-2xl flex items-center justify-center mb-2">
          <img src="@/assets/icons/jc.png" class="w-12 h-12 text-tutorials" alt="维修教程"/>
        </div>
        <h3 class="font-inter font-medium text-[14px] text-center">维修教程</h3>
      </div>

      <!-- 备件商城 -->
      <div class="icon-card" @click="goTo('/spare-parts')">
        <div class="icon-container bg-white/70 backdrop-blur-sm p-3 rounded-2xl flex items-center justify-center mb-2">
          <img src="@/assets/icons/lj.png" class="w-12 h-12 text-spare-parts" alt="备件商城"/>
        </div>
        <h3 class="font-inter font-medium text-[14px] text-center">备件仓库</h3>
      </div>
    </div>
        <!-- 底部Dock栏 - iPad风格 -->
  <div class="left-0 right-0 justify-around ">    
    <footer class="footer-self fixed bg-primary/0 bottom-4 left-20 right-20 z-10  flex justify-around  ">
      <div class="bg-transparent rounded-full s-center justifyhadow-sm px-10wy-2 flex flex-row items-center justify-center gap-6 w-auto">
        <button class="dock-item flex flex-col items-center py-1 px-3 rounded-lg hover:bg-white/10 transition-all duration-200">
          <img src="@/assets/icons/yj.png" class="dock-img w-1.5 h-1.5 text-primary" alt="首页"/>
        </button>
        <button class="dock-item flex flex-col items-center py-1 px-3 rounded-lg hover:bg-white/10 transition-all duration-200">
          <img src="@/assets/icons/ux.png" class="dock-img w-4.5 h-4.5 text-primary" alt="诊断"/>
        </button>
        <button class="dock-item flex flex-col items-center py-1 px-3 rounded-lg hover:bg-white/10 transition-all duration-200">
          <img src="@/assets/icons/yj.png" class="dock-img w-4.5 h-4.5 text-gray-400" alt="工具"/>
        </button>
        <button class="dock-item flex flex-col items-center py-1 px-3 rounded-lg hover:bg-white/10 transition-all duration-200">
          <img src="@/assets/icons/yx.png" class="dock-img w-2.5 h-4.5 text-gray-400" alt="设置"/>
        </button>
      </div>
    </footer>
  </div>  

  </div>



</template>

<style>
.footer-self{
  padding: 50px 10%;
}
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  position: relative;
}
</style>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>

<script>
export default {
  methods: {
    goTo(path) {
      this.$router.push(path);
    }
  }
};
</script>

<style scoped>
/* 图标网格布局 */
.icon-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  padding: 100px 32px 80px;
  flex: 1;
}

/* 保持CSS不变 */
.icon-container {
  transition: transform 0.3s ease;
}

.icon-container:hover {
  transform: translateY(-5px);
}

/* 图标容器样式 */
.icon-container {
  transition: transform 0.3s ease; /* 仅对transform属性做过渡 */
  text-align: center; /* 保持图片水平居中 */
}

.icon-container:hover {
  transform: translateY(-5px); /* 悬停时上移5px */
}

.icon-card:hover .icon-container {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}

/* 底部应用栏样式 */
footer {
 
}

footer svg {
  transition: color 0.3s ease;
}

footer div:hover svg {
  color: var(--color-primary);
}

.font-inter{
  color: #e5e7eb;
}

.dock-item{
  width:25%;
  height: 150px;
}

.dock-img{
  width: 150px;
  height: 150px;
}
.user-info{
  align-items: right;
  text-align: right;}

.text-left{
  align-items: right;
  text-align: right;
}
</style>