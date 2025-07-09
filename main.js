// ========================================
// PROJETO THREE.JS - VISUALIZAÇÃO 3D
// ========================================

// Variáveis globais
let scene, renderer, controls;
let perspectiveCamera, orthographicCamera, currentCamera;
let cube, sphere, plane, prism;
let clock;
let cubeColors = [0xff8000, 0x00ff00, 0x0077ff, 0xff00ff, 0xffffff];
let currentColorIndex = 0;


// ========================================
// INICIALIZAÇÃO
// ========================================

function init() {
    console.log('Inicializando projeto Three.js...');
    
    // Criar cena
    createScene();
    
    // Criar câmeras
    createCameras();
    
    // Criar renderer
    createRenderer();
    
    // Criar objetos 3D
    createObjects();
    
    // Configurar controles
    setupControls();
    
    // Configurar eventos
    setupEventListeners();
    
    // Iniciar loop de animação
    clock = new THREE.Clock();
    animate();
    
    console.log('Projeto inicializado com sucesso!');
}



// ========================================
// CRIAÇÃO DA CENA
// ========================================

function createScene() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a1a); // Fundo cinza escuro
    
    // Adicionar iluminação básica
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);
}

// ========================================
// CRIAÇÃO DAS CÂMERAS
// ========================================

function createCameras() {
    const aspect = window.innerWidth / window.innerHeight;
    
    // Câmera perspectiva
    perspectiveCamera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
    perspectiveCamera.position.set(5, 5, 5);
    perspectiveCamera.lookAt(0, 0, 0);
    
    // Câmera ortográfica
    const frustumSize = 10;
    orthographicCamera = new THREE.OrthographicCamera(
        frustumSize * aspect / -2,
        frustumSize * aspect / 2,
        frustumSize / 2,
        frustumSize / -2,
        1,
        1000
    );
    orthographicCamera.position.set(5, 5, 5);
    orthographicCamera.lookAt(0, 0, 0);
    
    // Câmera atual (inicia com perspectiva)
    currentCamera = perspectiveCamera;
}

// ========================================
// CRIAÇÃO DO RENDERER
// ========================================

function createRenderer() {
    renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Adicionar canvas ao DOM
    const container = document.getElementById('canvas-container');
    container.appendChild(renderer.domElement);
}

// ========================================
// CRIAÇÃO DOS OBJETOS 3D
// ========================================

function createObjects() {
    // 1. CUBO COM TEXTURA
    createCubeWithTexture();
    
    // 2. ESFERA COM TEXTURA
    createSphereWithTexture();
    
    // 3. PLANO COM TEXTURA XADREZ
    createPlaneWithCheckerboard();
    
    // 4. PRISMA (OCTAEDRO)
    createPrism();
}

function createCubeWithTexture() {
    const geometry = new THREE.BoxGeometry(2, 2, 2);

    const material = new THREE.MeshLambertMaterial({ color: cubeColors[currentColorIndex] });

    cube = new THREE.Mesh(geometry, material);
    cube.position.set(-3, 0.5, 0);
    cube.scale.set(1.0, 1.0, 1.0);
    scene.add(cube);
}

function createSphereWithTexture() {
    // Geometria da esfera
    const geometry = new THREE.SphereGeometry(1.5, 32, 32);
    
    // Criar textura gradiente
    const canvas = createGradientTexture(256, 256);
    const texture = new THREE.CanvasTexture(canvas);
    
    // Material com textura
    const material = new THREE.MeshLambertMaterial({ map: texture });
    
    // Criar esfera
    sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(3, 0, 0);
    sphere.scale.set(1.0, 1.0, 1.0);
    scene.add(sphere);
}

function createPlaneWithCheckerboard() {
    // Geometria do plano
    const geometry = new THREE.PlaneGeometry(32, 32);
    
    // Criar textura xadrez
    const canvas = createCheckerboardTexture(512, 512);
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2, 2);
    
    // Material com textura
    const material = new THREE.MeshLambertMaterial({ map: texture });
    
    // Criar plano
    plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = -Math.PI / 2;
    plane.position.set(0, -2, 0);
    scene.add(plane);
}

function createPrism() {
    // Geometria do prisma (octaedro)
    const geometry = new THREE.OctahedronGeometry(1.2, 0);
    
    // Material com cor roxa e brilho
    const material = new THREE.MeshPhongMaterial({ 
        color: 0x9c27b0,
        shininess: 100,
        transparent: true,
        opacity: 0.8
    });
    
    // Criar prisma
    prism = new THREE.Mesh(geometry, material);
    prism.position.set(0, 1.5, 0);
    prism.scale.set(1.0, 1.0, 1.0);
    scene.add(prism);
}

// ========================================
// CONFIGURAÇÃO DOS CONTROLES
// ========================================

function setupControls() {
    controls = new THREE.OrbitControls(currentCamera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 3;
    controls.maxDistance = 50;
    controls.maxPolarAngle = Math.PI / 2;
}

// ========================================
// EVENTOS
// ========================================

function setupEventListeners() {
    // Redimensionamento da janela
    window.addEventListener('resize', onWindowResize);
    
    // Troca de câmera com tecla C
    window.addEventListener('keydown', onKeyDown);
}

function onWindowResize() {
    const aspect = window.innerWidth / window.innerHeight;
    
    // Atualizar câmera perspectiva
    perspectiveCamera.aspect = aspect;
    perspectiveCamera.updateProjectionMatrix();
    
    // Atualizar câmera ortográfica
    const frustumSize = 10;
    orthographicCamera.left = frustumSize * aspect / -2;
    orthographicCamera.right = frustumSize * aspect / 2;
    orthographicCamera.top = frustumSize / 2;
    orthographicCamera.bottom = frustumSize / -2;
    orthographicCamera.updateProjectionMatrix();
    
    // Atualizar renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onKeyDown(event) {
    switch (event.code) {
        case 'KeyC':
            toggleCamera();
            break;
        case 'KeyV':
            changeCubeColor();
            break;
    }
}

function changeCubeColor() {
    if (!cube) return;

    currentColorIndex = (currentColorIndex + 1) % cubeColors.length;
    cube.material.color.setHex(cubeColors[currentColorIndex]);
    console.log(`Cor do cubo alterada para: ${cubeColors[currentColorIndex].toString(16)}`);
}

function toggleCamera() {
    if (currentCamera === perspectiveCamera) {
        currentCamera = orthographicCamera;
        console.log('Câmera alterada para: Ortográfica');
    } else {
        currentCamera = perspectiveCamera;
        console.log('Câmera alterada para: Perspectiva');
    }
    
    // Atualizar controles
    controls.object = currentCamera;
    controls.update();
}

// ========================================
// LOOP DE ANIMAÇÃO
// ========================================

function animate() {
    requestAnimationFrame(animate);
    
    const elapsedTime = clock.getElapsedTime();
    
    // Animações dos objetos
    updateAnimations(elapsedTime);
    
    // Atualizar controles
    controls.update();
    
    // Renderizar cena
    renderer.render(scene, currentCamera);
}

function updateAnimations(time) {
    // Cubo estático - sem animações
    
    // Animação da esfera (movimento de quique e rotação)
    if (sphere) {
        // Movimento de quique: a esfera "bate" no plano sem atravessá-lo
        // Plano está em y = -2, esfera tem raio 1.5
        // Centro da esfera deve ficar entre y = -0.5 (tocando o plano) e y = 1.0 (altura do quique)
        const bounceHeight = 1.5; // Altura máxima do quique
        const minHeight = -0.5;   // Altura mínima (tocando o plano)
        
        // Usar abs(sin) para criar movimento de quique mais realista
        const bounceMotion = Math.abs(Math.sin(time * 3));
        sphere.position.y = minHeight + (bounceMotion * bounceHeight);
        
        sphere.rotation.y = time;
    }
    
    // Animação do plano (rotação suave)
    if (plane) {
        plane.rotation.z = Math.sin(time * 0.3) * 0.1;
    }
    
    // Animação do prisma (rotação 3D e flutuação)
    if (prism) {
        // Rotação em múltiplos eixos
        prism.rotation.x = time * 0.5;
        prism.rotation.y = time * 0.8;
        prism.rotation.z = time * 0.3;
        
        // Movimento de flutuação suave
        prism.position.y = 1.5 + Math.sin(time * 2) * 0.3;
        
        // Efeito de escala pulsante
        const scale = 1.0 + Math.sin(time * 3) * 0.1;
        prism.scale.set(scale, scale, scale);
    }
}

// ========================================
// INICIALIZAÇÃO DO PROJETO
// ========================================

// Iniciar quando a página carregar
window.addEventListener('DOMContentLoaded', init); 