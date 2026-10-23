import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Mobile menu toggle
const menuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Hero Video (Slow Motion Playback)
const heroVideo = document.querySelector('.hero-video');
if (heroVideo) {
    heroVideo.playbackRate = 0.75; // "little bit slow mo"
}

// Scene State Management
const overlay = document.getElementById('transition-overlay');
let isTransitioning = false;

function transitionToScene(targetId) {
    if (isTransitioning) return;
    isTransitioning = true;
    
    const currentView = document.querySelector('.view.active');
    const targetView = document.getElementById(targetId);
    
    if (currentView === targetView) {
        isTransitioning = false;
        return;
    }
    
    // Set theme for overlay based on target
    overlay.className = 'scene-transition'; // reset
    if (targetView.classList.contains('theme-cpu')) overlay.classList.add('theme-cpu');
    if (targetView.classList.contains('theme-ram')) overlay.classList.add('theme-ram');
    if (targetView.classList.contains('theme-laptop')) overlay.classList.add('theme-laptop');
    
    // Show dark transition layer
    overlay.classList.add('active');
    
    setTimeout(() => {
        // Swap views while hidden
        if (currentView) currentView.classList.remove('active');
        targetView.classList.add('active');
        
        // Force resize update to ensure canvases fit correctly in the new active view
        window.dispatchEvent(new Event('resize'));
        
        // Wait a bit for the line animation in CSS, then fade out overlay
        setTimeout(() => {
            overlay.classList.remove('active');
            isTransitioning = false;
        }, 600); // Overlay stays for 600ms before fading out
        
    }, 400); // 400ms for overlay to fade in
}

// Edge Navigation Logic
const edgeLeft = document.getElementById('edge-left');
const edgeRight = document.getElementById('edge-right');
const edgeBottom = document.getElementById('edge-bottom');

// Only do proximity detection on desktop
if (window.matchMedia("(min-width: 769px)").matches) {
    window.addEventListener('mousemove', (e) => {
        // Only show if view-main is active and near top
        const viewMain = document.getElementById('view-main');
        if (!viewMain.classList.contains('active') || window.scrollY > window.innerHeight / 2) {
            edgeLeft.classList.remove('visible');
            edgeRight.classList.remove('visible');
            edgeBottom.classList.remove('visible');
            return;
        }
        
        const threshold = 150; // pixels from edge
        
        if (e.clientX < threshold) {
            edgeLeft.classList.add('visible');
        } else {
            edgeLeft.classList.remove('visible');
        }
        
        if (e.clientX > window.innerWidth - threshold) {
            edgeRight.classList.add('visible');
        } else {
            edgeRight.classList.remove('visible');
        }
        
        if (e.clientY > window.innerHeight - threshold && window.scrollY < 50) {
            edgeBottom.classList.add('visible');
        } else {
            edgeBottom.classList.remove('visible');
        }
    });
}

// Click handlers for scene transitions
document.querySelectorAll('[data-target]').forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (btn.tagName === 'A' && btn.getAttribute('href').startsWith('#')) {
            // normal anchor link
        } else {
            e.preventDefault();
            const targetId = btn.getAttribute('data-target');
            transitionToScene(targetId);
        }
    });
});

// Setup Intersection Observer for 3D containers for performance
const modelContainers = document.querySelectorAll('.webgl-canvas');
const loadedModels = new Set();

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const container = entry.target;
        container.isIntersecting = entry.isIntersecting;
        
        if (entry.isIntersecting) {
            const modelPath = container.dataset.model;
            if (!container.threeInitialized) {
                init3DModel(container, modelPath);
                container.threeInitialized = true;
            }
        }
    });
}, { threshold: 0.1 });

modelContainers.forEach(container => {
    observer.observe(container);
});

// Initialize 3D Scene
function init3DModel(container, modelPath) {
    const scene = new THREE.Scene();
    
    let width = container.clientWidth || 300;
    let height = container.clientHeight || 300;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 2, 5);
    
    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    
    // Attach to container for resize event
    container.threeCamera = camera;
    container.threeRenderer = renderer;
    
    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false;
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight2.position.set(-5, 5, -5);
    scene.add(directionalLight2);
    
    // Load Model
    const loader = new GLTFLoader();
    let model;
    
    loader.load(`assets/${modelPath}`, (gltf) => {
        model = gltf.scene;
        
        // Center and scale
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 180);
        let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
        cameraZ *= 2; // zoom out slightly
        
        camera.position.z = cameraZ;
        camera.position.y = center.y + (size.y * 0.2); // slightly above center
        
        // Model specific adjustments
        if (modelPath === 'laptop.glb') {
            camera.position.set(0, size.y, cameraZ * 1.2);
        } else if (modelPath === 'cpu.glb') {
            model.rotation.x = Math.PI / 4; // Better view angle
        }
        
        controls.target.copy(center);
        scene.add(model);
        controls.update();
    }, undefined, (error) => {
        console.error('Error loading model:', error);
    });
    
    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Only render if container is intersecting AND its parent view is active
        const parentView = container.closest('.view');
        if (container.isIntersecting && parentView && parentView.classList.contains('active')) {
            if (model) {
                // Very slow passive rotation for showcase
                model.rotation.y += 0.002;
            }
            controls.update();
            renderer.render(scene, camera);
        }
    }
    animate();
}

// Handle Window Resize for 3D canvases
window.addEventListener('resize', () => {
    modelContainers.forEach(container => {
        if (container.threeCamera && container.threeRenderer) {
            const width = container.clientWidth;
            const height = container.clientHeight;
            if (width && height) {
                container.threeCamera.aspect = width / height;
                container.threeCamera.updateProjectionMatrix();
                container.threeRenderer.setSize(width, height);
            }
        }
    });
});
