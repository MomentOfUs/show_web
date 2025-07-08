document.addEventListener('DOMContentLoaded', function() {
    // 功能模块初始化
    const faultAnalysisModule = new FaultAnalysisModule();
    const characterModule = new CharacterModule();
    const accessibilityModule = new AccessibilityModule();

    /**
         * 设置功能卡片的交互动画与事件监听
         * 包括悬停效果、点击动效、工具提示和波纹反馈
         */
    function setupFeatureCardInteractions() {
        const featureCards = document.querySelectorAll('.feature-card');

        featureCards.forEach(card => {
            // 添加工具提示文本
            const title = card.querySelector('.feature-title').textContent;
            const tooltipText = title === '故障大模型分析' ? '点击启动故障分析系统' : '点击召唤3D维修助手';
            card.insertAdjacentHTML('beforeend', `<div class="feature-tooltip">${tooltipText}</div>`);

            // 处理交互事件
            function handleInteraction(e) {
                e.preventDefault();
                card.classList.add('clicked');
                setTimeout(() => card.classList.remove('clicked'), 500);

                // 触发对应功能
                if (card.id === 'fault-analysis') {
                    faultAnalysisModule.open();
                } else if (card.id === '3d-character') {
                    characterModule.loadCharacter();
                }
            }

            // 鼠标事件
            card.addEventListener('click', handleInteraction);

            // 触摸事件
            card.addEventListener('touchstart', (e) => {
                handleInteraction(e);
                createRippleEffect(e.touches[0], card);
            }, { passive: false });

            // 鼠标悬停效果
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-2px)';
            });

            card.addEventListener('mouseleave', () => {
                if (!card.classList.contains('clicked')) {
                    card.style.transform = 'translateY(0)';
                }
            });
        });
    }

    /**
         * 创建触摸/点击波纹效果
         * @param {Event} event - 触摸或鼠标事件对象
         * @param {HTMLElement} element - 目标元素
         */
    function createRippleEffect(event, element) {
        const ripple = document.createElement('span');
        const diameter = Math.max(element.clientWidth, element.clientHeight);
        const radius = diameter / 2;

        ripple.style.width = ripple.style.height = `${diameter}px`;
        ripple.style.left = `${event.clientX - element.getBoundingClientRect().left - radius}px`;
        ripple.style.top = `${event.clientY - element.getBoundingClientRect().top - radius}px`;
        ripple.classList.add('ripple');

        const existingRipple = element.querySelector('.ripple');
        if (existingRipple) existingRipple.remove();

        element.appendChild(ripple);
    }

    setupFeatureCardInteractions();

    // 双击屏幕切换高对比度模式
    let lastClickTime = 0;
    document.body.addEventListener('dblclick', () => {
        accessibilityModule.toggleHighContrast();
    });
});

// 故障分析模块
class FaultAnalysisModule {
    constructor() {
        this.isActive = false;
        this.initElements();
    }

    initElements() {
        // 创建模态框元素
        this.modal = document.createElement('div');
        this.modal.className = 'slide-up-enter';
        this.modal.style.position = 'fixed';
        this.modal.style.bottom = '0';
        this.modal.style.left = '0';
        this.modal.style.width = '100%';
        this.modal.style.maxWidth = '460px';
        this.modal.style.height = '80%';
        this.modal.style.backgroundColor = 'white';
        this.modal.style.borderTopLeftRadius = '20px';
        this.modal.style.borderTopRightRadius = '20px';
        this.modal.style.zIndex = '1001';
        this.modal.style.padding = '20px';
        this.modal.style.display = 'none';

        // 添加模态框内容
        this.modal.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2 style="font-size: 20px;">故障大模型分析</h2>
                <button id="close-modal" class="ios-button">关闭</button>
            </div>
            <div class="camera-container">
                <video id="camera-preview" width="100%" height="100%" autoplay muted playsinline></video>
                <button id="take-photo" class="ios-button" style="position: absolute; bottom: 15px; left: 50%; transform: translateX(-50%);">拍照</button>
            </div>
            <textarea class="rich-text-input" placeholder="请描述故障情况..."></textarea>
            <div class="word-count">0/500</div>
            <button id="analyze-fault" class="ios-button" style="width: 100%;">开始分析</button>
            <div class="fault-flow" style="display: none;">
                <div class="flow-node">
                    <div class="flow-node-header">
                        <span>步骤1: 检查电源连接</span>
                        <span>+</span>
                    </div>
                    <div class="flow-node-content">
                        <p>确保设备已正确连接电源，指示灯是否亮起</p>
                        <p>技术参数: 输入电压 100-240V, 频率 50/60Hz</p>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(this.modal);

        // 绑定事件
        document.getElementById('close-modal').addEventListener('click', () => this.close());
        document.getElementById('take-photo').addEventListener('click', () => this.takePhoto());
        document.getElementById('analyze-fault').addEventListener('click', () => this.analyzeFault());

        // 字数统计
        const textarea = this.modal.querySelector('.rich-text-input');
        const wordCount = this.modal.querySelector('.word-count');
        textarea.addEventListener('input', () => {
            const count = textarea.value.length;
            wordCount.textContent = `${count}/500`;
            if (count > 500) {
                textarea.value = textarea.value.substring(0, 500);
                wordCount.textContent = `500/500`;
            }
        });

        // 流程图节点点击事件
        this.modal.querySelectorAll('.flow-node').forEach(node => {
            node.addEventListener('click', () => {
                node.classList.toggle('active');
                const plusMinus = node.querySelector('.flow-node-header span:last-child');
                plusMinus.textContent = node.classList.contains('active') ? '-' : '+';
            });
        });
    }

    open() {
        this.isActive = true;
        this.modal.style.display = 'block';
        setTimeout(() => {
            this.modal.classList.remove('slide-up-enter');
            this.modal.classList.add('slide-up-enter-active');
        }, 10);
        this.initCamera();
    }

    close() {
        this.isActive = false;
        this.modal.classList.remove('slide-up-enter-active');
        this.modal.classList.add('slide-up-enter');
        setTimeout(() => {
            this.modal.style.display = 'none';
            this.stopCamera();
        }, 300);
    }

    async initCamera() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { width: { ideal: 1280 }, height: { ideal: 720 } },
                audio: false
            });
            const videoElement = document.getElementById('camera-preview');
            videoElement.srcObject = stream;
            this.cameraStream = stream;
        } catch (error) {
            console.error('摄像头初始化失败:', error);
            alert('无法访问摄像头，请确保已授予权限');
        }
    }

    stopCamera() {
        if (this.cameraStream) {
            this.cameraStream.getTracks().forEach(track => track.stop());
        }
    }

    takePhoto() {
        const videoElement = document.getElementById('camera-preview');
        const canvas = document.createElement('canvas');
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        canvas.getContext('2d').drawImage(videoElement, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg');

        // 模拟图像加密存储
        this.encryptAndStoreImage(imageData);

        // 震动反馈
        this.triggerVibration();

        alert('照片已拍摄并加密存储');
    }

    encryptAndStoreImage(imageData) {
        // AES-256加密模拟实现
        localStorage.setItem('faultImage', btoa(imageData));
    }

    triggerVibration() {
        // 模拟微震动效果
        const button = document.getElementById('take-photo');
        button.classList.add('vibrate-on-click');
        setTimeout(() => button.classList.remove('vibrate-on-click'), 100);
    }

    analyzeFault() {
        const textarea = this.modal.querySelector('.rich-text-input');
        if (!textarea.value.trim()) {
            alert('请描述故障情况');
            return;
        }

        // 显示分析结果
        this.modal.querySelector('.fault-flow').style.display = 'block';
        this.triggerVibration();
    }
}

// 3D角色模块
class CharacterModule {
    constructor() {
        this.isLoaded = false;
        this.threejsScene = null;
        this.characterModel = null;
    }

    async loadCharacter() {
        if (!this.isLoaded) {
            // 检查Three.js是否加载
            if (typeof THREE === 'undefined') {
                this.loadThreeJsLibrary();
                return;
            }

            // 创建角色容器
            this.createCharacterContainer();
            this.initThreeJsScene();
            this.loadModel();
            this.createFloatingButtons();

            this.isLoaded = true;
        } else {
            this.showCharacterContainer();
        }
    }

    loadThreeJsLibrary() {
        // 动态加载Three.js库
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/three@0.132.2/build/three.min.js';
        script.onload = () => {
            alert('Three.js加载完成，点击"王老修"图标再次打开');
        };
        document.head.appendChild(script);
    }

    createCharacterContainer() {
        this.container = document.createElement('div');
        this.container.className = 'slide-up-enter';
        this.container.style.position = 'fixed';
        this.container.style.bottom = '0';
        this.container.style.left = '0';
        this.container.style.width = '100%';
        this.container.style.maxWidth = '460px';
        this.container.style.height = '80%';
        this.container.style.backgroundColor = 'white';
        this.container.style.borderTopLeftRadius = '20px';
        this.container.style.borderTopRightRadius = '20px';
        this.container.style.zIndex = '1001';
        this.container.style.padding = '20px';
        this.container.style.display = 'none';

        this.container.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2 style="font-size: 20px;">王老修</h2>
                <button id="close-character" class="ios-button">关闭</button>
            </div>
            <div class="character-container" id="character-scene"></div>
        `;

        document.body.appendChild(this.container);
        document.getElementById('close-character').addEventListener('click', () => this.hideCharacterContainer());
    }

    initThreeJsScene() {
        const container = document.getElementById('character-scene');
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(this.renderer.domElement);

        // 添加基础光照
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(0, 1, 1);
        this.scene.add(directionalLight);

        // 添加简单几何体作为占位模型
        const geometry = new THREE.SphereGeometry(1, 32, 32);
        const material = new THREE.MeshStandardMaterial({
            color: 0x007AFF,
            metalness: 0.8,
            roughness: 0.2
        });
        this.characterModel = new THREE.Mesh(geometry, material);
        this.scene.add(this.characterModel);

        this.camera.position.z = 5;

        // 添加动画循环
        this.animate();
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        if (this.characterModel) {
            this.characterModel.rotation.y += 0.01;
        }

        this.renderer.render(this.scene, this.camera);
    }

    loadModel() {
        // 实际项目中这里会加载GLB/GLTF模型
        // 目前使用占位模型，显示加载提示
        setTimeout(() => {
            alert('3D角色"王老修"加载完成，开始互动吧！');
        }, 1500);
    }

    createFloatingButtons() {
        const fabContainer = document.createElement('div');
        fabContainer.className = 'floating-action-buttons';
        fabContainer.innerHTML = `
            <button class="fab-button" id="consult-btn">💬</button>
            <button class="fab-button" id="history-btn">🕒</button>
            <button class="fab-button" id="skills-btn">📊</button>
        `;
        this.container.appendChild(fabContainer);

        // 绑定悬浮按钮事件
        document.getElementById('consult-btn').addEventListener('click', () => {
            this.triggerVoiceConsult();
        });

        document.getElementById('history-btn').addEventListener('click', () => {
            alert('显示历史记录时间轴');
        });

        document.getElementById('skills-btn').addEventListener('click', () => {
            alert('显示3D技能树图谱');
        });
    }

    triggerVoiceConsult() {
        // 模拟语音输入
        this.triggerVibration();
        alert('语音输入已激活，开始说话...');
    }

    triggerVibration() {
        const buttons = document.querySelectorAll('.fab-button');
        buttons.forEach(btn => {
            btn.classList.add('vibrate-on-click');
            setTimeout(() => btn.classList.remove('vibrate-on-click'), 100);
        });
    }

    showCharacterContainer() {
        this.container.style.display = 'block';
        setTimeout(() => {
            this.container.classList.remove('slide-up-enter');
            this.container.classList.add('slide-up-enter-active');
        }, 10);
    }

    hideCharacterContainer() {
        this.container.classList.remove('slide-up-enter-active');
        this.container.classList.add('slide-up-enter');
        setTimeout(() => {
            this.container.style.display = 'none';
        }, 300);
    }
}

// 无障碍模块
class AccessibilityModule {
    constructor() {
        this.highContrastMode = false;
    }

    toggleHighContrast() {
        this.highContrastMode = !this.highContrastMode;
        document.body.classList.toggle('high-contrast', this.highContrastMode);
        alert(this.highContrastMode ? '高对比度模式已开启' : '高对比度模式已关闭');
    }
}