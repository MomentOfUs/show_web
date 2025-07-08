<template>
  <div class="adjustment-container min-h-screen bg-gray-50">
    <!-- 顶部导航 -->
    <header class="bg-white shadow-sm sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <button @click="handleBack" class="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <img src="@/assets/icons/fh.png" alt="返回" class="h-5 w-5 mr-2">
            返回
          </button>
          <h1 class="text-xl font-semibold text-gray-800">设备调整方案</h1>
          <div class="w-10"></div> <!-- 占位元素，保持标题居中 -->
        </div>
      </div>
    </header>

    <!-- 进度指示器 -->
    <div class="bg-white py-4 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row items-center">
          <div class="w-full md:w-1/2 mb-4 md:mb-0">
            <div class="flex items-center">
              <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div class="bg-blue-600 h-2.5 rounded-full" :style="{ width: progressPercentage + '%' }"></div>
              </div>
              <span class="ml-4 text-sm font-medium text-gray-700">{{ completedSteps }}/{{ totalSteps }} 步骤</span>
            </div>
          </div>
          <div class="w-full md:w-1/2 flex justify-between items-center">
            <div class="flex -space-x-2">
              <span v-for="i in totalSteps" :key="i" class="w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-medium"
                :class="{ 'border-gray-300 text-gray-500': i > completedSteps, 'border-blue-500 bg-blue-500 text-white': i <= completedSteps }">
                {{ i }}
              </span>
            </div>
            <span class="text-sm text-gray-500">{{ progressPercentage }}% 完成</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 主要内容区 -->
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <!-- 方案说明 -->
          <div class="bg-blue-50 border-b border-blue-100 p-4">
            <h2 class="text-lg font-medium text-blue-800">调整方案：机器启动前准备</h2>
            <p class="mt-1 text-sm text-blue-700">请按照以下步骤完成设备调整，所有步骤完成后即可启动机器。</p>
          </div>

          <!-- 步骤列表 -->
          <div class="divide-y divide-gray-200">
            <div v-for="(step, index) in adjustmentSteps" :key="step.id" class="p-6 hover:bg-gray-50 transition-colors">
              <div class="flex">
                <div class="flex-shrink-0">
                    <img src="@/assets/icons/jc.png" alt="步骤 {{ index + 1 }}" class="w-6 h-6 rounded-full">
                  </div>
                <div class="ml-4 flex-1">
                  <h3 class="text-lg font-medium text-gray-900">{{ step.title }}</h3>
                  <div class="mt-2 text-sm text-gray-600">
                    <p>{{ step.description }}</p>
                  </div>
                  <div class="mt-4 flex flex-col sm:flex-row sm:items-center">
                    <div class="flex-shrink-0 mb-3 sm:mb-0 sm:mr-4">
                      <img :src="step.imageUrl" alt="{{ step.title }}" class="h-40 w-auto rounded-md shadow">
                    </div>
                    <div class="flex-1">
                      <ul class="list-disc pl-5 text-sm text-gray-600 space-y-1">
                        <li v-for="instruction in step.instructions" :key="instruction">{{ instruction }}</li>
                      </ul>
                      <div class="mt-4 flex justify-end">
                        <button
                          @click="toggleStepCompletion(index)"
                          class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                          :class="{
                            'bg-green-600 hover:bg-green-700 text-white': !step.completed,
                            'bg-gray-300 text-gray-500 cursor-not-allowed': step.completed
                          }"
                          :disabled="step.completed"
                        >
                          <img v-if="step.completed" src="@/assets/icons/wc.png" alt="完成" class="h-4 w-4 mr-2">
                          {{ step.completed ? '已完成' : '标记为完成' }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 启动机器区域 -->
        <div class="mt-8 bg-white rounded-lg shadow-md p-6 text-center">
          <div class="mb-4">
            <img v-if="allStepsCompleted" src="@/assets/icons/yx.png" alt="完成" class="h-16 w-16 mx-auto">
            <img v-else src="@/assets/icons/ux.png" alt="未完成" class="h-8 w-8 text-gray-300 mx-auto">
          </div>
          <h2 class="text-xl font-semibold text-gray-900 mb-2">{{ allStepsCompleted ? '所有调整已完成！' : '请完成所有调整步骤' }}</h2>
          <p class="text-gray-600 mb-6">{{ allStepsCompleted ? '您已成功完成所有设备调整步骤，可以启动机器了。' : '完成所有调整步骤后，您将能够启动机器。' }}</p>
            <button
              @click="handleStartMachine"
              class="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
              :class="{
                'bg-green-600 hover:bg-green-700': allStepsCompleted,
                'bg-gray-300 text-gray-500 cursor-not-allowed': !allStepsCompleted
              }"
              :disabled="!allStepsCompleted"
            >
              <img src="@/assets/icons/qd.png" alt="启动" class="h-5 w-5 mr-2">
              启动机器
            </button>
        </div>
      </div>
    </main>

    <!-- 提示对话框 -->
    <teleport to="body">
      <div v-if="showTipDialog" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 transform transition-all">
          <div class="p-6">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <img src="@/assets/icons/tip.png" alt="提示" class="h-4 w-4 mr-2">
              </div>
              <div class="ml-3">
                <h3 class="text-lg leading-6 font-medium text-gray-900">{{ currentTip.title }}</h3>
                <div class="mt-2 text-sm text-gray-600">
                  <p>{{ currentTip.content }}</p>
                </div>
              </div>
              <div class="ml-auto pl-3">
                <button @click="showTipDialog = false" class="inline-flex text-gray-400 hover:text-gray-500">
                  <span class="sr-only">关闭</span>
                  <img src="@/assets/icons/gb.png" alt="关闭" class="h-5 w-5">
                </button>
              </div>
            </div>
            <div class="mt-4">
              <img :src="currentTip.imageUrl" alt="提示图片" class="w-full h-auto rounded-md">
            </div>
            <div class="mt-5 sm:mt-6 Sm:ml-10 sm:flex sm:flex-row-reverse">
              <button
                @click="showTipDialog = false"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                明白了
              </button>
            </div>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// 调整步骤数据
const adjustmentSteps = ref([
  {
    id: 1,
    title: '检查电源连接',
    description: '确保设备电源连接正确且稳定，避免启动时出现电力故障。',
    imageUrl: 'https://picsum.photos/id/180/600/400',
    instructions: [
      '确认电源线插头完全插入插座',
      '检查电源开关处于关闭状态',
      '确保电压符合设备要求（220V）'
    ],
    completed: false,
    tip: {
      title: '电源连接提示',
      content: '建议使用独立插座，避免与其他高功率设备共用，以防止电压波动。',
      imageUrl: 'https://picsum.photos/id/96/600/400'
    }
  },
  {
    id: 2,
    title: '调整机械臂位置',
    description: '将机械臂移动到初始位置，确保工作范围内无障碍物。',
    imageUrl: 'https://picsum.photos/id/26/600/400',
    instructions: [
      '手动操作机械臂控制杆，将其移动到原点位置',
      '检查工作区域，移除所有障碍物',
      '确认限位开关工作正常'
    ],
    completed: false,
    tip: {
      title: '机械臂调整技巧',
      content: '移动机械臂时应缓慢操作，如遇到阻力应立即停止检查，避免损坏设备。',
      imageUrl: 'https://picsum.photos/id/48/600/400'
    }
  },
  {
    id: 3,
    title: '配置参数设置',
    description: '根据工作需求，调整设备运行参数。',
    imageUrl: 'https://picsum.photos/id/4/600/400',
    instructions: [
      '进入参数设置界面',
      '设置工作速度为中等（30%）',
      '调整精度等级为0.1mm',
      '保存参数配置'
    ],
    completed: false,
    tip: {
      title: '参数设置建议',
      content: '初次启动建议使用默认参数，待设备稳定运行后再根据实际需求调整。',
      imageUrl: 'https://picsum.photos/id/20/600/400'
    }
  },
  {
    id: 4,
    title: '系统自检',
    description: '启动系统自检程序，确保所有组件工作正常。',
    imageUrl: 'https://picsum.photos/id/160/600/400',
    instructions: [
      '按下控制面板上的自检按钮',
      '等待自检程序完成（约30秒）',
      '确认所有指示灯显示正常（绿色）',
      '如有异常，记录错误代码并排查'
    ],
    completed: false,
    tip: {
      title: '自检注意事项',
      content: '自检过程中请勿触碰设备运动部件，以免造成伤害或设备损坏。',
      imageUrl: 'https://picsum.photos/id/119/600/400'
    }
  }
]);

// 状态管理
const showTipDialog = ref(false);
const currentTip = ref(null);

// 计算属性
const totalSteps = computed(() => adjustmentSteps.value.length);
const completedSteps = computed(() => adjustmentSteps.value.filter(step => step.completed).length);
const progressPercentage = computed(() => Math.round((completedSteps.value / totalSteps.value) * 100));
const allStepsCompleted = computed(() => completedSteps.value === totalSteps.value);

// 方法
const handleBack = () => {
  router.go(-1);
};

const toggleStepCompletion = (index) => {
  adjustmentSteps.value[index].completed = true;
  // 显示提示信息
  currentTip.value = adjustmentSteps.value[index].tip;
  showTipDialog.value = true;
};

const handleStartMachine = () => {
  // 这里可以添加启动机器的逻辑
  alert('机器启动成功！设备将在3秒后开始运行。');
  router.push('/dashboard'); // 假设启动后跳转到仪表盘页面
};

// 生命周期钩子
onMounted(() => {
  // 可以在这里加载保存的进度
  const savedProgress = localStorage.getItem('adjustmentProgress');
  if (savedProgress) {
    const progress = JSON.parse(savedProgress);
    adjustmentSteps.value.forEach((step, index) => {
      if (progress[index] !== undefined) {
        step.completed = progress[index];
      }
    });
  }
});

// 监听步骤变化，保存进度
watch(adjustmentSteps, (newValue) => {
  const progress = newValue.map(step => step.completed);
  localStorage.setItem('adjustmentProgress', JSON.stringify(progress));
}, { deep: true });
</script>

<style scoped>
.adjustment-container {
  background-color: #f9fafb;
}

/* 动画效果 */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* 步骤项动画 */
.divide-y > div {
  animation: fadeIn 0.3s ease-out;
}

/* 进度条动画 */
.bg-blue-600 {
  transition: width 0.5s ease-in-out;
}
</style>