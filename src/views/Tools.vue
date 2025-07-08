<template>
  <div class="tools-container tablet-landscape">
    <!-- 顶部导航栏 -->
    <header class="navbar bg-primary text-white h-11 flex items-center px-4">
      <button @click="goBack" class="mr-4">
        <img src="@/assets/icons/app.png" class="w-6 h-6" alt="返回"/>
      </button>
      <h1 class="font-inter font-medium text-[18px]">工具库</h1>
    </header>

    <!-- 工具分类标签 -->
    <div class="tools-tabs bg-white px-4 py-3">
      <div class="flex overflow-x-auto pb-2">
        <button class="tab-item active mr-3 whitespace-nowrap px-4 py-2 rounded-full text-sm" @click="selectCategory('electric')">
          电工工具
        </button>
        <button class="tab-item mr-3 whitespace-nowrap px-4 py-2 rounded-full text-sm" @click="selectCategory('mechanical')">
          机械工具
        </button>
        <button class="tab-item mr-3 whitespace-nowrap px-4 py-2 rounded-full text-sm" @click="selectCategory('measuring')">
          测量工具
        </button>
        <button class="tab-item mr-3 whitespace-nowrap px-4 py-2 rounded-full text-sm" @click="selectCategory('special')">
          专用工具
        </button>
      </div>
    </div>

    <!-- 工具列表 -->
    <div class="tools-list p-4">
      <div class="grid grid-cols-2 gap-4">
        <!-- 工具卡片1 -->
        <div class="tool-card bg-white rounded-xl shadow-sm overflow-hidden" @click="showToolDetail('multimeter')">
          <div class="tool-icon-container bg-tools/10 p-4 flex justify-center">
            <img src="@/assets/icons/app.png" class="w-14 h-14 text-tools tool-rotate" alt="万用表"/>
          </div>
          <div class="tool-info p-3">
            <h3 class="font-inter font-medium text-base">万用表</h3>
            <p class="text-xs text-gray-600 mt-1">测量电压、电流、电阻</p>
          </div>
        </div>

        <!-- 工具卡片2 -->
        <div class="tool-card bg-white rounded-xl shadow-sm overflow-hidden" @click="showToolDetail('screwdriver')">
          <div class="tool-icon-container bg-tools/10 p-4 flex justify-center">
            <img src="@/assets/icons/app.png" class="w-14 h-14 text-tools" alt="螺丝刀套装"/>
          </div>
          <div class="tool-info p-3">
            <h3 class="font-inter font-medium text-base">螺丝刀套装</h3>
            <p class="text-xs text-gray-600 mt-1">十字、一字多种规格</p>
          </div>
        </div>

        <!-- 工具卡片3 -->
        <div class="tool-card bg-white rounded-xl shadow-sm overflow-hidden" @click="showToolDetail('pliers')">
          <div class="tool-icon-container bg-tools/10 p-4 flex justify-center">
            <img src="@/assets/icons/app.png" class="w-14 h-14 text-tools" alt="尖嘴钳"/>
          </div>
          <div class="tool-info p-3">
            <h3 class="font-inter font-medium text-base">尖嘴钳</h3>
            <p class="text-xs text-gray-600 mt-1">夹持、剪切细小部件</p>
          </div>
        </div>

        <!-- 工具卡片4 -->
        <div class="tool-card bg-white rounded-xl shadow-sm overflow-hidden" @click="showToolDetail('soldering')">
          <div class="tool-icon-container bg-tools/10 p-4 flex justify-center">
            <img src="@/assets/icons/app.png" class="w-14 h-14 text-tools" alt="电烙铁"/>
          </div>
          <div class="tool-info p-3">
            <h3 class="font-inter font-medium text-base">电烙铁</h3>
            <p class="text-xs text-gray-600 mt-1">电子元件焊接工具</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 工具详情模态框 -->
    <div class="modal-overlay" v-if="showDetail" @click="closeDetail">
      <div class="modal-content bg-white rounded-2xl p-5 max-w-xs mx-auto" @click.stop>
        <div class="modal-header flex justify-between items-center mb-4">
          <h2 class="font-inter font-medium text-xl">{{ currentTool.name }}</h2>
          <button @click="closeDetail">
            <img src="@/assets/icons/app.png" class="w-5 h-5 text-gray-600" alt="关闭"/>
          </button>
        </div>
        <div class="modal-body">
          <div class="tool-detail-icon bg-tools/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <img src="@/assets/icons/app.png" class="w-10 h-10 text-tools" :alt="currentTool.name"/>
          </div>
          <p class="text-sm text-gray-600 mb-4">{{ currentTool.description }}</p>
          <div class="tool-specs text-sm space-y-2">
            <div class="spec-item flex justify-between">
              <span class="text-gray-600">规格:</span>
              <span>{{ currentTool.specs }}</span>
            </div>
            <div class="spec-item flex justify-between">
              <span class="text-gray-600">用途:</span>
              <span>{{ currentTool.usage }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeCategory: 'electric',
      showDetail: false,
      currentTool: {
        name: '',
        description: '',
        specs: '',
        usage: '',
        iconPath: ''
      },
      tools: {
        multimeter: {
          name: '万用表',
          description: '用于测量电压、电流和电阻的电子测试工具，是电子维修必备仪器。',
          specs: '数字式，自动量程',
          usage: '电路检测、元件测量',
          iconPath: 'M7 2v2h10V2h-2v2h-6V2H7zm3 6v2h4V8h-4zm-3 4v2h10v-2H7zm0 4v2h10v-2H7zm0 4v2h10v-2H7zM19 2h-2v2h2V2zm0 4h-2v2h2V6zm0 4h-2v2h2v-2zm0 4h-2v2h2v-2zm0 4h-2v2h2v-2zm0 4h-2v2h2v-2z'
        },
        screwdriver: {
          name: '螺丝刀套装',
          description: '包含多种规格的十字和一字螺丝刀，适用于不同型号的螺丝拆卸与安装。',
          specs: '6件套，磁性刀头',
          usage: '螺丝紧固与拆卸',
          iconPath: 'M19 2h-2v2h2V2zm0 4h-2v2h2V6zm0 4h-2v2h2v-2zm0 4h-2v2h2v-2zm0 4h-2v2h2v-2zm0 4h-2v2h2v-2zM7 19c-1.1 0-1.99.9-1.99 2S5.9 23 7 23s2-.9 2-2-.9-2-2-2zM1 3c0 .55.45 1 1 1h14c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1z'
        },
        pliers: {
          name: '尖嘴钳',
          description: '头部细长，适用于在狭小空间中夹持、弯曲和剪切导线及细小零件。',
          specs: '6英寸，防滑手柄',
          usage: '夹持细小部件、剪切导线',
          iconPath: 'M18.5 1.15C17.97 1.15 17.46 1.34 17.07 1.73L11.26 7.55L16.11 12.4L21.93 6.59C23.12 5.4 23.12 3.28 21.93 2.09C21.54 1.7 21.03 1.5 20.5 1.5H19.25C18.83 1.5 18.5 1.17 18.5 0.75V1.15M15.93 8.5L8.5 15.93L3.07 10.5C2.45 9.87 2.45 8.9 3.07 8.27C3.69 7.65 4.66 7.65 5.29 8.27L10.5 13.5L15.93 8.5Z'
        },
        soldering: {
          name: '电烙铁',
          description: '用于电子元件焊接的工具，通过加热烙铁头融化焊锡，实现元件之间的电气连接。',
          specs: '30W恒温，可调温度',
          usage: '电子元件焊接、电路修复',
          iconPath: 'M15 13V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h1v5l3-3h3v-5h4zm-2 0H5V5h8v8z M18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-3.5-12zm-2.62 7l1.62-4.5h3.25l1.62 4.5h-6.5z'
        }
      }
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    selectCategory(category) {
      this.activeCategory = category;
    },
    showToolDetail(toolKey) {
      this.currentTool = this.tools[toolKey];
      this.showDetail = true;
      document.body.style.overflow = 'hidden';
    },
    closeDetail() {
      this.showDetail = false;
      document.body.style.overflow = '';
    }
  }
};
</script>

<style scoped>
/* 标签样式 */
.tab-item {
  background-color: #F5F5F5;
  color: #666666;
  transition: all 0.2s ease;
}

.tab-item.active {
  background-color: #4CAF50;
  color: white;
}

/* 工具卡片样式 */
.tool-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.tool-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

/* 模态框样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.modal-content {
  max-height: 80vh;
  overflow-y: auto;
}
</style>