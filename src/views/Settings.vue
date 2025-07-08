<template>
  <div class="settings-container bg-gray-50 min-h-screen p-4 md:p-6 ml-[100px]" >
    <!-- 返回按钮 -->
    <button @click="handleBack" class="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors pl-2" >
      <img src="@/assets/icons/fh.png" alt="返回" class="h-4 w-4 mr-2">
      返回
    </button>

    <!-- 页面标题 -->
    <div class="mb-8 text-center">
      <h1 class="text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-gray-800 mb-2">大模型设置</h1>
      <p class="text-gray-500">自定义您的AI助手参数和偏好</p>
    </div>

    <!-- 设置卡片容器 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 ml-10 ">
      <!-- 左侧：模型选择 -->
      <div class="lg:col-span-1 space-y-6">
        <!-- 模型选择卡片 -->
         
        <div class="bg-black rounded-xl shadow-md transition-all hover:shadow-lg p-10">
          <h2 class="text-lg font-semibold mb-4 flex items-center">
            <img src="@/assets/icons/mx.png" alt="模型选择" class="text-8xl h-4 w-2 mr-2 text-blue-500">
            模型选择
          </h2>
          <div class="space-y-3">
            <div class="relative">
              <select v-model="selectedModel" class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md appearance-none bg-white border">
                <option value="gpt-4">GPT-4</option>
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                <option value="claude-2">Claude 2</option>
                <option value="gemini-pro">Gemini Pro</option>
                <option value="ernie-bot">文心一言</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <img src="@/assets/icons/xiala.png" alt="下拉箭头" class="h-3 w-3">
              </div>
            </div>
            <div class="p-3 bg-blue-50 rounded-lg border border-blue-100">
              <p class="text-sm text-blue-800"><i class="fas fa-info-circle mr-1"></i> 当前选择: {{ modelDescriptions[selectedModel]?.name }}</p>
              <p class="text-xs text-blue-600 mt-1">{{ modelDescriptions[selectedModel]?.description }}</p>
            </div>
          </div>
        </div>

        <!-- API配置卡片 -->
        <div class="bg-white rounded-xl shadow-md p-5 transition-all hover:shadow-lg">
          <h2 class="text-lg font-semibold mb-4 flex items-center">
            <img src="@/assets/icons/api.png" alt="API配置" class="h-4 w-4 mr-2 text-green-500">
            API 配置
          </h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">API 密钥</label>
              <div class="relative">
                <input
                  v-model="apiKey"
                  :type="showApiKey ? 'text' : 'password'"
                  class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  placeholder="sk-..."
                >
                <button
                  @click="showApiKey = !showApiKey"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  <i class="fas fa-eye" v-if="showApiKey"></i>
                  <i class="fas fa-eye-slash" v-else></i>
                </button>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">API 端点 (可选)</label>
              <input
                v-model="apiEndpoint"
                class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                placeholder="https://api.openai.com/v1"
              >
            </div>
            <button @click="saveApiConfig" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
              保存 API 配置
            </button>
          </div>
        </div>
      </div>

      <!-- 右侧：参数设置和高级选项 -->
      <div class="lg:col-span-2 space-y-6">
        <!-- 参数调节卡片 -->
        <div class="bg-white rounded-xl shadow-md p-5 transition-all hover:shadow-lg">
          <h2 class="text-lg font-semibold mb-4 flex items-center">
            <img src="@/assets/icons/cs.png" alt="参数调节" class="h-4 w-4 mr-2 text-purple-500">
            参数调节
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- 温度设置 -->
            <div>
              <div class="flex justify-between items-center mb-2">
                <label class="block text-sm font-medium text-gray-700">温度 (0-2)</label>
                <span class="text-sm text-gray-500">{{ temperature.toFixed(1) }}</span>
              </div>
              <input
                type="range"
                v-model.number="temperature"
                min="0"
                max="2"
                step="0.1"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
              >
              <p class="mt-1 text-xs text-gray-500">控制输出的随机性，较低的值会使输出更加确定</p>
            </div>

            <!-- Top P设置 -->
            <div>
              <div class="flex justify-between items-center mb-2">
                <label class="block text-sm font-medium text-gray-700">Top P (0-1)</label>
                <span class="text-sm text-gray-500">{{ topP.toFixed(1) }}</span>
              </div>
              <input
                type="range"
                v-model.number="topP"
                min="0"
                max="1"
                step="0.1"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
              >
              <p class="mt-1 text-xs text-gray-500">控制输出的多样性，与温度互斥，建议只调整一个</p>
            </div>

            <!-- 最大长度 -->
            <div>
              <div class="flex justify-between items-center mb-2">
                <label class="block text-sm font-medium text-gray-700">最大输出长度</label>
                <span class="text-sm text-gray-500">{{ maxLength }}</span>
              </div>
              <input
                type="range"
                v-model.number="maxLength"
                min="100"
                max="4000"
                step="100"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
              >
              <div class="flex justify-between text-xs text-gray-500 mt-1">
                <span>100</span>
                <span>4000</span>
              </div>
            </div>

            <!-- 频率惩罚 -->
            <div>
              <div class="flex justify-between items-center mb-2">
                <label class="block text-sm font-medium text-gray-700">频率惩罚 (-2-2)</label>
                <span class="text-sm text-gray-500">{{ frequencyPenalty.toFixed(1) }}</span>
              </div>
              <input
                type="range"
                v-model.number="frequencyPenalty"
                min="-2"
                max="2"
                step="0.1"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
              >
              <p class="mt-1 text-xs text-gray-500">减少模型重复相同内容的可能性</p>
            </div>
          </div>
        </div>

        <!-- 高级设置卡片 -->
        <div class="bg-white rounded-xl shadow-md p-5 transition-all hover:shadow-lg">
          <h2 class="text-lg font-semibold mb-4 flex items-center">
            <img src="@/assets/icons/gj.png" alt="高级设置" class="h-4 w-4 mr-2 text-amber-500">
            高级设置
          </h2>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <label class="block text-sm font-medium text-gray-700">流式输出</label>
                <p class="text-xs text-gray-500">逐字显示模型响应</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="streaming" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>

            <div class="flex items-center justify-between">
              <div>
                <label class="block text-sm font-medium text-gray-700">自动保存对话</label>
                <p class="text-xs text-gray-500">自动保存历史对话记录</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="autoSave" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>

            <div class="flex items-center justify-between">
              <div>
                <label class="block text-sm font-medium text-gray-700">安全过滤</label>
                <p class="text-xs text-gray-500">过滤敏感内容</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="safeMode" class="sr-only peer" checked>
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">系统提示词</label>
              <textarea
                v-model="systemPrompt"
                rows="4"
                class="block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                placeholder="您是一位 helpful、诚实和无害的AI助手..."
              ></textarea>
              <p class="mt-1 text-xs text-gray-500">自定义模型行为的系统级指令</p>
            </div>
          </div>
        </div>

        <!-- 操作按钮区域 -->
        <div class="flex flex-col sm:flex-row gap-4 pt-2">
          <button @click="resetSettings" class="flex-1 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
            <img src="@/assets/icons/zhongzhi.png" alt="重置" class="h-5 w-5 mr-2">
  重置为默认值
          </button>
          <button @click="saveSettings" class="flex-1 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
            <img src="@/assets/icons/baocun.png" alt="保存" class="h-1 w-1 mr-2">
  保存所有设置
          </button>
        </div>
      </div>
    </div>

    <!-- 提示气泡 -->
    <div class="fixed bottom-6 right-6 max-w-xs bg-blue-50 border-l-4 border-blue-500 p-4 rounded shadow-lg animate-fadeIn">
      <div class="flex">
        <div class="flex-shrink-0">
          <img src="@/assets/icons/tip.png" alt="提示" class="h-5 w-5 text-blue-500 mr-2">
        </div>
        <div class="ml-3">
          <p class="text-sm text-blue-700"><strong class="font-medium">小徐提示：</strong>调整温度参数可以改变AI回答的创造性，数值越高回答越随机多样。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// 模型数据
const selectedModel = ref('gpt-3.5-turbo');
const modelDescriptions = ref({
  'gpt-4': {
    name: 'GPT-4',
    description: '功能强大的模型，适合复杂任务和推理'
  },
  'gpt-3.5-turbo': {
    name: 'GPT-3.5 Turbo',
    description: '性价比高的模型，响应速度快'
  },
  'claude-2': {
    name: 'Claude 2',
    description: '擅长处理长文本，支持10万token上下文'
  },
  'gemini-pro': {
    name: 'Gemini Pro',
    description: 'Google的多模态模型，支持文本和图像'
  },
  'ernie-bot': {
    name: '文心一言',
    description: '百度开发的大语言模型，熟悉中文语境'
  }
});

// API配置
const apiKey = ref('');
const apiEndpoint = ref('');
const showApiKey = ref(false);

// 参数设置
const temperature = ref(0.7);
const topP = ref(0.9);
const maxLength = ref(1000);
const frequencyPenalty = ref(0);
const streaming = ref(true);
const autoSave = ref(true);
const safeMode = ref(true);
const systemPrompt = ref('您是一位 helpful、诚实和无害的AI助手，能够清晰、准确地回答用户问题。');

// 生命周期钩子 - 加载保存的设置
onMounted(() => {
  loadSettings();
});

// 方法
const handleBack = () => {
  router.go(-1);
};

const saveApiConfig = () => {
  // 保存API配置逻辑
  alert('API配置已保存！');
};

const saveSettings = () => {
  // 保存所有设置到本地存储
  const settings = {
    selectedModel: selectedModel.value,
    apiKey: apiKey.value,
    apiEndpoint: apiEndpoint.value,
    temperature: temperature.value,
    topP: topP.value,
    maxLength: maxLength.value,
    frequencyPenalty: frequencyPenalty.value,
    streaming: streaming.value,
    autoSave: autoSave.value,
    safeMode: safeMode.value,
    systemPrompt: systemPrompt.value
  };

  localStorage.setItem('modelSettings', JSON.stringify(settings));
  alert('所有设置已保存！');
};

const resetSettings = () => {
  if (confirm('确定要重置为默认设置吗？')) {
    localStorage.removeItem('modelSettings');
    // 重置为默认值
    selectedModel.value = 'gpt-3.5-turbo';
    apiKey.value = '';
    apiEndpoint.value = '';
    temperature.value = 0.7;
    topP.value = 0.9;
    maxLength.value = 1000;
    frequencyPenalty.value = 0;
    streaming.value = true;
    autoSave.value = true;
    safeMode.value = true;
    systemPrompt.value = '您是一位 helpful、诚实和无害的AI助手，能够清晰、准确地回答用户问题。';
    alert('已重置为默认设置！');
  }
};

const loadSettings = () => {
  const savedSettings = localStorage.getItem('modelSettings');
  if (savedSettings) {
    const settings = JSON.parse(savedSettings);
    selectedModel.value = settings.selectedModel || 'gpt-3.5-turbo';
    apiKey.value = settings.apiKey || '';
    apiEndpoint.value = settings.apiEndpoint || '';
    temperature.value = settings.temperature !== undefined ? settings.temperature : 0.7;
    topP.value = settings.topP !== undefined ? settings.topP : 0.9;
    maxLength.value = settings.maxLength || 1000;
    frequencyPenalty.value = settings.frequencyPenalty !== undefined ? settings.frequencyPenalty : 0;
    streaming.value = settings.streaming !== undefined ? settings.streaming : true;
    autoSave.value = settings.autoSave !== undefined ? settings.autoSave : true;
    safeMode.value = settings.safeMode !== undefined ? settings.safeMode : true;
    systemPrompt.value = settings.systemPrompt || '您是一位 helpful、诚实和无害的AI助手，能够清晰、准确地回答用户问题。';
  }
};
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease-out forwards;
}

.settings-container {
  background-color: #f9fafb;
}

/* 自定义滑块样式 */
input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  transition: all 0.15s ease;
}

input[type=range]::-webkit-slider-thumb:hover {
  transform: scale(1.2);
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
}
</style>