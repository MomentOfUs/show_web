import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/css/main.css';

import 'vant/lib/index.css';

// 导入Vuetify
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// 配置Vuetify主题
const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#1E88E5',
          secondary: '#FFC107',
          accent: '#8BC34A',
          error: '#F44336',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FF9800'
        }
      }
    }
  }
})

// 平滑滚动兼容处理
if (!('scrollBehavior' in document.documentElement.style)) {
  import('smoothscroll-polyfill').then(polyfill => {
    polyfill.polyfill();
  });
}

createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app');