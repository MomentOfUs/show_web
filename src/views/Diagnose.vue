<template>
  <div class="diagnose-container">
    <!-- 返回按钮 -->
    <button @click="goBack" class="back-button">
      <i class="fas fa-arrow-left"></i> 返回
    </button>
    <!-- 视频展示区域 -->
    <div class="video-container">
      <!-- 视频说明文本 -->
      <div class="video-caption">实时设备状态预览</div>
}      <video
            ref="demoVideo"
            class="demo-video"
            width="100%"
            max-width="800px"
            height="auto"
            :autoplay="!videoPaused"
            muted
            :loop="!videoPaused"
            playsinline
            @error="handleVideoError"
          >
        <source src="@/assets/video/demo-video.mp4" type="video/mp4" />
        您的浏览器不支持视频播放
      </video>
    </div>

    <!-- 问题输入区域 -->
    <div class="input-section">
      <div class="input-description">请详细描述您遇到的设备问题，我们将基于视频内容为您提供分析结果</div>
        <textarea
          v-model="problemInput"
          placeholder="例如：设备无法启动，屏幕显示异常..."
          class="problem-textarea"
          rows="4"
          aria-label="问题描述输入框"
        ></textarea>
    </div>

    <!-- 分析按钮 -->
    <div class="button-section">
      <button
        @click="showAnalysisResult"
        :disabled="!problemInput.trim()"
        class="analyze-button"
      >
        <i class="fas fa-search"></i> 分析问题
      </button>
    </div>

    <!-- 分析结果弹窗 -->
    <div :class="{ 'modal-overlay': true, 'active': showModal }">
      <div class="modal-content">
          <div class="modal-header">
            <h3>视频分析结果</h3>
            <button @click="closeModal" class="close-button">&times;</button>
          </div>
          <div v-if="loading" class="loading-indicator">
            <div class="spinner"></div>
            <p>模型正在火速思考您的问题，请稍候...</p>
          </div>
          <div v-else class="modal-body">
          <!-- 截图显示 -->
          <div class="screenshot-container" v-if="capturedFrame">
            <img :src="capturedFrame" alt="视频截图" class="screenshot-image" />
            <p class="screenshot-caption">问题分析素材</p>
          </div>
          <div class="analysis-result">
            <p class="result-title">检测到的问题:</p>
            <p class="result-content">{{ problemInput }}</p>
            <p class="result-title">建议解决方案:</p>
            <p class="result-content">根据您提供的问题描述，我们建议您检查设备连接状态，重启相关服务，并确保软件版本为最新。如问题持续，请联系技术支持获取进一步帮助。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { showToast } from 'vant';


export default {
  setup() {
    // 响应式数据
    const problemInput = ref('');
    const showModal = ref(false);
    const capturedFrame = ref('');
    const videoPaused = ref(false);
    const videoRef = ref(null);
    const loading = ref(false);
    
  

          // 截取视频帧并处理可能的错误
            const captureVideoFrame = (video) => {
              try {
                if (!video || video.videoWidth === 0 || video.videoHeight === 0) {
                  throw new Error('视频尚未加载完成或无法获取尺寸');
                }
                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                const ctx = canvas.getContext('2d');
                if (!ctx) {
                  throw new Error('无法获取Canvas绘图上下文');
                }
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                capturedFrame.value = canvas.toDataURL('image/png');
              } catch (error) {
                console.error('截图失败:', error);
                alert('无法捕获视频画面，请稍后重试');
              }
            };

            const showAnalysisResult = async () => {
      if (problemInput.value.trim()) {
        // 暂停视频
        const video = videoRef.value;
        if (video) {
          video.pause();
          videoPaused.value = true;
          // 截取当前帧
          captureVideoFrame(video);
        }
        showModal.value = true;
          loading.value = true;
          // 模拟分析思考过程
          await new Promise(resolve => setTimeout(resolve, 1500));
          loading.value = false;
      }
    };


    // 返回上一页
    const goBack = () => {
        window.history.back();
      };

      // 视频错误处理
      const handleVideoError = () => {
        showToast('视频加载失败，请检查文件或网络连接', 'error');
      };

    const closeModal = () => {
        showModal.value = false;
        // 恢复视频播放
        const video = videoRef.value;
        if (video && videoPaused.value) {
          video.play();
          videoPaused.value = false;
        }
      };

    return {
      problemInput,
      showModal,
      showAnalysisResult,
      closeModal,
      goBack,
      videoRef,
      loading
    };
  }
};
</script>

<style scoped>
.diagnose-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Roboto, sans-serif;
}

.back-button {
  align-self: flex-start;
  padding: 8px 16px;
  background-color: #f0f0f0;
  color: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 20px;
  transition: all 0.2s ease;
}

.back-button:hover {
  background-color: #e0e0e0;
  transform: translateX(-2px);
}

.video-container {
  width: 100%;
  background-color: #000;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
  position: relative;
}

.loading-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.video-caption {
  position: absolute;
  top: 12px;
  left: 12px;
  color: white;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
  z-index: 10;
}

.demo-video {
  width: 100%;
  object-fit: cover;
}

.input-section {
  margin-bottom: 20px;
}

.problem-textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  resize: vertical;
  font-size: 14px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.problem-textarea:focus {
  outline: none;
  border-color: #4285f4;
  box-shadow: 0 0 0 3px rgba(66, 133, 244, 0.1);
}

.screenshot-container {
  margin-bottom: 20px;
  text-align: center;
}

.screenshot-image {
  max-width: 100%;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.screenshot-caption {
  margin-top: 8px;
  color: #666;
  font-size: 14px;
  font-style: italic;
}

.input-description {
  color: #666;
  font-size: 14px;
  margin-bottom: 8px;
  line-height: 1.5;
}


.button-section {
  text-align: center;
  margin-bottom: 30px;
}

.analyze-button {
  padding: 12px 24px;
  background-color: #4285f4;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
}

.analyze-button:hover:not(:disabled) {
  background-color: #3367d6;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(66, 133, 244, 0.2);
}

.analyze-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

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
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.modal-overlay.active {
  opacity: 1;
  visibility: visible;
}

.modal-content {
  background-color: white;
  padding: 24px;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #eee;
}

.modal-header h3 {
  margin: 0;
  color: #333;
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
}

.analysis-result {
  line-height: 1.6;
  color: #444;
}

.result-title {
  font-weight: bold;
  margin-top: 16px;
  color: #222;
}

.result-content {
  margin-bottom: 12px;
  padding-left: 8px;
}
</style>

