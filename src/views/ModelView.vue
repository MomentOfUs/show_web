<template>
  <div class="model-container">
  <div class="content-wrapper">
    <button @click="goBack" class="back-button">
      <i class="fas fa-arrow-left"></i> 返回
    </button>
    
    <div class="video-container">
      <div class="hover-text">嗨，王老师来了~</div>
      <video
        ref="modelVideo"
        class="model-video"
        autoplay
        muted
        loop
        playsinline
      >
        <source src="@/assets/video/model1.mp4" type="video/mp4">
        您的浏览器不支持视频播放
      </video>
    </div>
    <div class="action-buttons">
      <button @click="handleAskQuestion" class="action-btn">询问问题</button>
      <button @click="handleTroubleshoot" class="action-btn">故障排查</button>
      <button @click="handleKnowledgeImport" class="action-btn">知识导入</button>
    </div>
  </div>
</div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();

const goBack = () => {
  window.history.back();
};

const handleAskQuestion = () => {
  // 可替换为实际问题询问页面路由
  router.push('/diagnose');
};

const handleTroubleshoot = () => {
  router.push('/diagnose');
};

const handleKnowledgeImport = () => {
  // 可替换为实际知识导入页面路由
  alert('知识导入功能即将上线');
};

    return {
      goBack
    };
  }
};
</script>

<style scoped>
.model-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.content-wrapper {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

@media (max-width: 768px) {
  .content-wrapper {
    flex-direction: column;
  }
}

.video-container {
  position: relative;
  width: 100%;
  margin-top: 20px;
  border-radius: 8px;
  overflow: hidden;
}

.hover-text {
  position: absolute;
  top: 13%;
  left: 75%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 30px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 10;
}

.video-container:hover .hover-text {
  opacity: 1;
}

.model-video {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 200px;
  flex-shrink: 0;
}

.action-btn {
  padding: 12px 16px;
  background-color: #4285f4;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
  text-align: center;
}

.action-btn:hover {
  background-color: #3367d6;
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.back-button {
  padding: 8px 16px;
  background-color: #f0f0f0;
  color: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
}

.back-button:hover {
  background-color: #e0e0e0;
  transform: translateX(-2px);
}
</style>