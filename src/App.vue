<template>
  <div class="app-container">
    <router-view v-slot="{ Component }">
      <transition name="page-transition">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style scoped>
.app-container {
  width: 100%;
  height: 100%;
  border-radius: 0;
  box-shadow: none;
  overflow: hidden;
  margin: 0;
  padding: 0;
  position: relative;
}

.page-transition-enter-active {
  animation: pageIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.page-transition-leave-active {
  animation: pageOut 0.4s ease-in-out;
}

@keyframes pageIn {
  from {
    transform: translateY(100%) scale(0.95);
    opacity: 0;
  }
  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}

@keyframes pageOut {
  from {
    transform: scale(1);
    opacity: 1;
  }
  to {
    transform: scale(0.9) translateY(20px);
    opacity: 0;
  }
}
</style>