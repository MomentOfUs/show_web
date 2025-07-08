<template>
  <div class="spare-parts-container tablet-landscape">
    <!-- 顶部导航栏 -->
    <header class="navbar bg-primary text-white h-11 flex items-center px-4">
      <button @click="goBack" class="mr-4">
        <img src="@/assets/icons/app.png" class="w-6 h-6" alt="返回"/>
      </button>
      <h1 class="font-inter font-medium text-[18px]">备件商城</h1>
      <div class="ml-auto relative" @click="toggleCart">
        <img src="@/assets/icons/app.png" class="w-6 h-6" alt="购物车"/>
        <span class="cart-badge absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {{ cartItems.length }}
        </span>
      </div>
    </header>

    <!-- 分类导航 -->
    <div class="category-nav bg-white shadow-sm">
      <div class="flex overflow-x-auto">
        <button class="category-item active flex-shrink-0" @click="selectCategory('batteries')">
          <span>电池</span>
        </button>
        <button class="category-item flex-shrink-0" @click="selectCategory('screens')">
          <span>屏幕</span>
        </button>
        <button class="category-item flex-shrink-0" @click="selectCategory('chargers')">
          <span>充电器</span>
        </button>
        <button class="category-item flex-shrink-0" @click="selectCategory('keyboards')">
          <span>键盘</span>
        </button>
        <button class="category-item flex-shrink-0" @click="selectCategory('motherboards')">
          <span>主板</span>
        </button>
      </div>
    </div>

    <!-- 产品列表 -->
    <div class="products-container p-4">
      <div class="grid grid-cols-2 gap-4">
        <!-- 产品卡片1 -->
        <div class="product-card bg-white rounded-xl shadow-sm overflow-hidden" v-for="product in filteredProducts" :key="product.id">
          <div class="product-image-container relative">
            <img :src="product.image" alt="{{ product.name }}" class="w-full h-36 object-cover">
            <div class="product-price absolute top-2 right-2 bg-spare-parts text-white text-xs px-2 py-1 rounded">
              ¥{{ product.price }}
            </div>
          </div>
          <div class="product-info p-3">
            <h3 class="font-inter font-medium text-sm line-clamp-2">{{ product.name }}</h3>
            <div class="product-rating flex items-center mt-1">
              <img src="@/assets/icons/app.png" class="w-3 h-3 text-yellow-400" alt="评分"/>
              <span class="text-xs text-gray-600 ml-1">{{ product.rating }}</span>
            </div>
            <button class="add-to-cart-btn mt-2 w-full py-1.5 bg-spare-parts/10 text-spare-parts text-xs rounded-full flex items-center justify-center" @click="addToCart(product)">
              <img src="@/assets/icons/app.png" class="w-3 h-3 mr-1 gear-spin" alt="添加"/>
              加入购物车
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 购物车侧边栏 -->
    <div class="cart-sidebar" :class="cartOpen ? 'open' : ''">
      <div class="cart-header bg-spare-parts text-white p-4 flex justify-between items-center">
        <h2 class="font-inter font-medium text-lg">购物车</h2>
        <button @click="toggleCart">
          <img src="@/assets/icons/app.png" class="w-5 h-5" alt="关闭"/>
        </button>
      </div>
      <div class="cart-items p-4 max-h-[calc(100vh-180px)] overflow-y-auto">
        <div v-if="cartItems.length === 0" class="empty-cart text-center py-10 text-gray-500 text-sm">
          <img src="@/assets/icons/app.png" class="w-12 h-12 mx-auto mb-2 text-gray-300" alt="空购物车"/>
          购物车为空
        </div>
        <div v-else>
          <div class="cart-item flex py-3 border-b" v-for="(item, index) in cartItems" :key="index">
            <img :src="item.image" alt="{{ item.name }}" class="w-16 h-16 object-cover rounded mr-3">
            <div class="flex-1">
              <h4 class="font-inter text-sm font-medium">{{ item.name }}</h4>
              <div class="flex justify-between items-center mt-1">
                <span class="text-spare-parts text-sm font-medium">¥{{ item.price }}</span>
                <div class="quantity-control flex items-center border rounded">
                  <button class="w-6 h-6 flex items-center justify-center text-xs" @click="decreaseQuantity(index)">-</button>
                  <span class="w-6 h-6 flex items-center justify-center text-xs">{{ item.quantity }}</span>
                  <button class="w-6 h-6 flex items-center justify-center text-xs" @click="increaseQuantity(index)">+</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="cart-footer p-4 border-t" v-if="cartItems.length > 0">
        <div class="total-amount flex justify-between mb-4">
          <span class="text-gray-600">总计:</span>
          <span class="font-inter font-medium">¥{{ totalAmount.toFixed(2) }}</span>
        </div>
        <button class="checkout-btn w-full py-2 bg-spare-parts text-white rounded-full text-sm font-medium">
          结算
        </button>
      </div>
    </div>
    <div class="cart-overlay" :class="cartOpen ? 'open' : ''" @click="toggleCart"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeCategory: 'batteries',
      cartOpen: false,
      cartItems: [],
      products: {
        batteries: [
          {
            id: 1,
            name: 'iPhone 13 电池 原装品质',
            price: 129,
            rating: 4.8,
            image: 'https://picsum.photos/200/200?random=20'
          },
          {
            id: 2,
            name: 'Samsung Galaxy S21 电池',
            price: 119,
            rating: 4.6,
            image: 'https://picsum.photos/200/200?random=21'
          },
          {
            id: 3,
            name: '华为Mate 40 Pro 电池',
            price: 149,
            rating: 4.7,
            image: 'https://picsum.photos/200/200?random=22'
          },
          {
            id: 4,
            name: '小米11 高容量电池',
            price: 99,
            rating: 4.5,
            image: 'https://picsum.photos/200/200?random=23'
          }
        ],
        screens: [
          {
            id: 5,
            name: 'iPad Pro 11寸 屏幕总成',
            price: 899,
            rating: 4.6,
            image: 'https://picsum.photos/200/200?random=24'
          },
          {
            id: 6,
            name: 'MacBook Pro 13寸 视网膜屏幕',
            price: 1599,
            rating: 4.7,
            image: 'https://picsum.photos/200/200?random=25'
          }
        ],
        chargers: [
          {
            id: 7,
            name: '65W 氮化镓充电器 多口',
            price: 89,
            rating: 4.9,
            image: 'https://picsum.photos/200/200?random=26'
          },
          {
            id: 8,
            name: '苹果MagSafe 无线充电器',
            price: 299,
            rating: 4.5,
            image: 'https://picsum.photos/200/200?random=27'
          }
        ],
        keyboards: [
          {
            id: 9,
            name: 'MacBook Air 键盘总成',
            price: 499,
            rating: 4.6,
            image: 'https://picsum.photos/200/200?random=28'
          },
          {
            id: 10,
            name: '机械键盘 青轴',
            price: 129,
            rating: 4.7,
            image: 'https://picsum.photos/200/200?random=29'
          }
        ],
        motherboards: [
          {
            id: 11,
            name: '游戏主板 B550',
            price: 899,
            rating: 4.8,
            image: 'https://picsum.photos/200/200?random=30'
          },
          {
            id: 12,
            name: '迷你主板 H410',
            price: 599,
            rating: 4.5,
            image: 'https://picsum.photos/200/200?random=31'
          }
        ]
      }
    };
  },
  computed: {
    filteredProducts() {
      return this.products[this.activeCategory] || [];
    },
    totalAmount() {
      return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    selectCategory(category) {
      this.activeCategory = category;
      // 滚动到顶部
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    toggleCart() {
      this.cartOpen = !this.cartOpen;
      document.body.style.overflow = this.cartOpen ? 'hidden' : '';
    },
    addToCart(product) {
      // 检查商品是否已在购物车中
      const existingItemIndex = this.cartItems.findIndex(item => item.id === product.id);

      if (existingItemIndex >= 0) {
        // 如果已存在，增加数量
        this.cartItems[existingItemIndex].quantity++;
      } else {
        // 如果不存在，添加新商品
        this.cartItems.push({ ...product, quantity: 1 });
      }

      // 显示购物车
      this.toggleCart();

      // 添加购物车动画
      this.animateAddToCart();
    },
    animateAddToCart() {
      // 这里可以添加商品飞入购物车的动画
      const cartIcon = document.querySelector('.navbar .relative');
      cartIcon.classList.add('cart-bounce');
      setTimeout(() => {
        cartIcon.classList.remove('cart-bounce');
      }, 500);
    },
    increaseQuantity(index) {
      this.cartItems[index].quantity++;
    },
    decreaseQuantity(index) {
      if (this.cartItems[index].quantity > 1) {
        this.cartItems[index].quantity--;
      } else {
        this.cartItems.splice(index, 1);
      }
    }
  }
};
</script>

<style scoped>
/* 分类导航样式 */
.category-nav {
  position: sticky;
  top: 0;
  z-index: 5;
}

.category-item {
  padding: 12px 16px;
  color: #666666;
  border-bottom: 2px solid transparent;
  white-space: nowrap;
}

.category-item.active {
  color: #9C27B0;
  border-bottom-color: #9C27B0;
}

/* 产品卡片样式 */
.product-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

/* 购物车侧边栏 */
.cart-sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100vh;
  background-color: white;
  transform: translateX(100%);
  transition: transform 0.3s ease;
  z-index: 100;
  display: flex;
  flex-direction: column;
}

.cart-sidebar.open {
  transform: translateX(0);
}

.cart-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  z-index: 99;
}

.cart-overlay.open {
  opacity: 1;
  pointer-events: auto;
}

/* 购物车动画 */
.cart-bounce {
  animation: bounce 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes bounce {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}

/* 数量控制按钮 */
.quantity-control button {
  background-color: transparent;
}

.quantity-control button:hover {
  background-color: #f5f5f5;
}
</style>