<template>
  <div class="error-container">
    <button @click="goBack" class="back-button">
      <i class="fas fa-arrow-left"></i> 返回
    </button>

    <div class="error-content">
      <div class="error-icon">
        <i class="fas fa-exclamation-circle"></i>
      </div>
      <h2 class="error-title">操作失败</h2>
      <p class="error-message">抱歉，当前操作遇到问题，请稍后重试</p>
      <div class="error-details" v-if="errorDetails">
        <p class="details-label">错误详情:</p>
        <p class="details-content">{{ errorDetails }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const errorDetails = ref('');

    onMounted(() => {
      // 从路由参数获取错误详情
      if (route.query.details) {
        errorDetails.value = route.query.details;
      }
    });

    const goBack = () => {
      window.history.length > 1 ? window.history.back() : window.location.href = '/';
    };

    return {
      goBack,
      errorDetails
    };
  }
};
</script>

<style scoped>
.error-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.error-content {
  margin-top: 50px;
  padding: 40px;
  border-radius: 8px;
  background-color: #f8f9fa;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.error-icon {
  font-size: 64px;
  color: #e74c3c;
  margin-bottom: 20px;
}

.error-title {
  font-size: 24px;
  color: #333;
  margin-bottom: 16px;
}

.error-message {
  font-size: 16px;
  color: #666;
  margin-bottom: 24px;
  line-height: 1.5;
}

.error-details {
  text-align: left;
  padding: 16px;
  background-color: #fff3cd;
  border-radius: 4px;
  border-left: 4px solid #ffc107;
}

.details-label {
  font-weight: bold;
  margin-bottom: 8px;
  color: #856404;
}

.details-content {
  color: #721c24;
  margin: 0;
  font-family: monospace;
  white-space: pre-wrap;
}

/* 复用返回按钮样式 */
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