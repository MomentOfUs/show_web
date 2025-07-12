<template>
  <div class="tutorials-container tablet-landscape">
    <!-- 顶部导航栏 -->
    <header class="navbar bg-primary text-white h-11 flex items-center px-4">
      <button @click="goBack" class="mr-4">
        <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
      </button>
      <h1 class="font-inter font-medium text-[18px]">维修教程</h1>
    </header>

    <!-- 教程分类 -->
    <div class="tutorials-tabs bg-white px-4 py-3">
      <div class="flex overflow-x-auto pb-2">
        <button class="tab-item active mr-3 whitespace-nowrap px-4 py-2 rounded-full text-sm" @click="selectCategory('video')">
          视频教程
        </button>
        <button class="tab-item mr-3 whitespace-nowrap px-4 py-2 rounded-full text-sm" @click="selectCategory('text')">
          图文教程
        </button>
        <button class="tab-item mr-3 whitespace-nowrap px-4 py-2 rounded-full text-sm" @click="selectCategory('common')">
          常见问题
        </button>
      </div>
    </div>

    <!-- 视频教程区 -->
    <div class="video-tutorials p-4" v-if="activeCategory === 'video'">
      <div class="grid grid-cols-1 gap-4">
        <!-- 视频卡片1 -->
        <div class="video-card bg-white rounded-xl overflow-hidden shadow-sm" @click="playVideo('battery-replacement')">
          <div class="video-thumbnail relative">
            <img src="https://picsum.photos/400/225?random=1" alt="电池更换教程" class="w-full h-40 object-cover">
            <div class="play-button absolute inset-0 flex items-center justify-center">
              <div class="w-12 h-12 rounded-full bg-primary/80 flex items-center justify-center">
                <svg class="w-6 h-6 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
            <div class="video-duration absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
              05:32
            </div>
          </div>
          <div class="video-info p-3">
            <h3 class="font-inter font-medium text-base">智能手机电池更换教程</h3>
            <div class="video-meta flex items-center mt-2 text-xs text-gray-600">
              <span class="mr-3">12.5k 次观看</span>
              <span>3天前更新</span>
            </div>
          </div>
        </div>

        <!-- 视频卡片2 -->
        <div class="video-card bg-white rounded-xl overflow-hidden shadow-sm" @click="playVideo('screen-repair')">
          <div class="video-thumbnail relative">
            <img src="https://picsum.photos/400/225?random=2" alt="屏幕修复教程" class="w-full h-40 object-cover">
            <div class="play-button absolute inset-0 flex items-center justify-center">
              <div class="w-12 h-12 rounded-full bg-primary/80 flex items-center justify-center">
                <svg class="w-6 h-6 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
            <div class="video-duration absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
              08:45
            </div>
          </div>
          <div class="video-info p-3">
            <h3 class="font-inter font-medium text-base">平板电脑屏幕修复指南</h3>
            <div class="video-meta flex items-center mt-2 text-xs text-gray-600">
              <span class="mr-3">8.3k 次观看</span>
              <span>1周前更新</span>
            </div>
          </div>
        </div>

        <!-- 视频卡片3 -->
        <div class="video-card bg-white rounded-xl overflow-hidden shadow-sm" @click="playVideo('keyboard-clean')">
          <div class="video-thumbnail relative">
            <img src="https://picsum.photos/400/225?random=3" alt="键盘清洁教程" class="w-full h-40 object-cover">
            <div class="play-button absolute inset-0 flex items-center justify-center">
              <div class="w-12 h-12 rounded-full bg-primary/80 flex items-center justify-center">
                <svg class="w-6 h-6 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
            <div class="video-duration absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
              03:18
            </div>
          </div>
          <div class="video-info p-3">
            <h3 class="font-inter font-medium text-base">笔记本键盘深度清洁教程</h3>
            <div class="video-meta flex items-center mt-2 text-xs text-gray-600">
              <span class="mr-3">15.2k 次观看</span>
              <span>2周前更新</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 图文教程区 -->
    <div class="text-tutorials p-4" v-if="activeCategory === 'text'">
      <div class="tutorial-detail bg-white rounded-xl p-4 shadow-sm">
        <h2 class="font-inter font-medium text-xl mb-4">笔记本电脑清灰换硅脂教程</h2>

        <div class="tutorial-meta flex items-center text-sm text-gray-600 mb-6">
          <span class="mr-4"><i class="mr-1">⏱️</i> 难度：中等</span>
          <span class="mr-4"><i class="mr-1">⌛</i> 预计时间：30分钟</span>
          <span><i class="mr-1">🛠️</i> 所需工具：螺丝刀、散热硅脂</span>
        </div>

        <!-- 步骤列表 -->
        <div class="steps-list space-y-6">
          <div class="step-item" v-for="(step, index) in steps" :key="index" ref="stepItems">
            <div class="step-header flex items-start mb-2">
              <span class="step-number bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">{{ index + 1 }}</span>
              <h3 class="font-inter font-medium text-base">{{ step.title }}</h3>
            </div>
            <div class="step-content pl-11">
              <img :src="step.image" alt="步骤 {{ index + 1 }}" class="w-full h-48 object-cover rounded-lg mb-3 lazy-image" :data-src="step.image">
              <p class="text-sm text-gray-700">{{ step.description }}</p>
              <div v-if="step.isKeyStep" class="key-step-alert mt-3 bg-yellow-50 border-l-4 border-yellow-400 p-3 text-sm">
                <strong class="text-yellow-700">注意：</strong> {{ step.alertText }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 视频播放模态框 -->
    <div class="modal-overlay" v-if="showVideoPlayer" @click="closeVideoPlayer">
      <div class="video-modal-content bg-black rounded-xl p-5 max-w-md mx-auto" @click.stop>
        <div class="modal-header flex justify-end mb-4">
          <button @click="closeVideoPlayer" class="text-white">
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>
        <div class="video-player-container">
          <div class="aspect-w-16 aspect-h-9 bg-gray-900 rounded-lg overflow-hidden">
            <video class="w-full h-full object-contain" controls :src="currentVideoUrl"></video>
          </div>
          <div class="video-title mt-4 text-white font-medium">
            {{ currentVideoTitle }}
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
      activeCategory: 'video',
      showVideoPlayer: false,
      currentVideoUrl: '',
      currentVideoTitle: '',
      steps: [
        {
          title: '准备工作与工具',
          image: 'https://picsum.photos/400/225?random=10',
          description: '关闭笔记本电脑电源，拔掉电源适配器。准备好所需工具：十字螺丝刀、一字螺丝刀、散热硅脂、酒精棉片、小刷子和撬棒。',
          isKeyStep: true,
          alertText: '确保电脑已完全断电，避免静电损坏内部元件。'
        },
        {
          title: '拆卸笔记本底盖',
          image: 'https://picsum.photos/400/225?random=11',
          description: '使用合适的螺丝刀拧下笔记本底部的所有螺丝，注意不同位置可能有不同规格的螺丝。使用撬棒沿底盖边缘轻轻撬开，分离底盖与机身。',
          isKeyStep: false
        },
        {
          title: '清理风扇与散热片',
          image: 'https://picsum.photos/400/225?random=12',
          description: '找到风扇和散热片位置，使用小刷子轻轻清理表面灰尘。对于顽固灰尘，可用酒精棉片擦拭。如果风扇噪音大，可考虑更换风扇或添加润滑油。',
          isKeyStep: true,
          alertText: '清理时动作要轻，避免损坏风扇叶片和散热鳍片。'
        },
        {
          title: '更换CPU硅脂',
          image: 'https://picsum.photos/400/225?random=13',
          description: '小心取下散热模组，用酒精棉片彻底清洁CPU和GPU表面的旧硅脂。在CPU和GPU表面均匀涂抹一层薄薄的新硅脂，注意不要涂抹过多。',
          isKeyStep: true,
          alertText: '硅脂只需涂抹薄薄一层即可，过多反而会影响散热效果。'
        },
        {
          title: '重新组装笔记本',
          image: 'https://picsum.photos/400/225?random=14',
          description: '按照拆卸的相反顺序重新安装散热模组、底盖和螺丝。注意螺丝要按照对角顺序逐步拧紧，避免用力过猛损坏主板。',
          isKeyStep: false
        }
      ]
    };
  },
  mounted() {
    // 初始化懒加载
    this.initLazyLoading();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    selectCategory(category) {
      this.activeCategory = category;
      // 切换到图文教程时重新初始化懒加载
      if (category === 'text') {
        this.$nextTick(() => this.initLazyLoading());
      }
    },
    playVideo(videoKey) {
      // 模拟视频URL
      this.currentVideoUrl = 'https://example.com/videos/' + videoKey + '.mp4';
      
      // 设置视频标题
      const videoTitles = {
        'battery-replacement': '智能手机电池更换教程',
        'screen-repair': '平板电脑屏幕修复指南',
        'keyboard-clean': '笔记本键盘深度清洁教程'
      };
      this.currentVideoTitle = videoTitles[videoKey];
      this.showVideoPlayer = true;
      document.body.style.overflow = 'hidden';
    },
    closeVideoPlayer() {
      this.showVideoPlayer = false;
      document.body.style.overflow = '';
    },
    initLazyLoading() {
      // 使用Intersection Observer实现图片懒加载
      const lazyImages = document.querySelectorAll('.lazy-image');
      
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const image = entry.target;
              image.src = image.dataset.src;
              image.classList.add('loaded');
              imageObserver.unobserve(image);
            }
          });
        });

        lazyImages.forEach(image => {
          imageObserver.observe(image);
        });
      } else {
        // 回退方案：立即加载所有图片
        lazyImages.forEach(image => {
          image.src = image.dataset.src;
          image.classList.add('loaded');
        });
      }
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
  background-color: #2196F3;
  color: white;
}

/* 视频卡片样式 */
.video-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.video-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

/* 播放按钮动画 */
.play-button .w-12 {
  transition: transform 0.3s ease;
}

.video-card:hover .play-button .w-12 {
  transform: scale(1.1);
}

/* 懒加载图片样式 */
.lazy-image {
  background-color: #F5F5F5;
  transition: opacity 0.3s ease;
  opacity: 0;
}

.lazy-image.loaded {
  opacity: 1;
}

/* 关键步骤高亮动画 */
.key-step-alert {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 204, 0, 0.4);
  }
  70% {
    box-shadow: 0 0 0 6px rgba(255, 204, 0, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 204, 0, 0);
  }
}

/* 模态框样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.video-modal-content {
  max-width: 90vw;
  max-height: 80vh;
  overflow-y: auto;
}
</style>