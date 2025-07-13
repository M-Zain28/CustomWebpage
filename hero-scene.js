// Three.js Hero Scene
class HeroScene {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.robot = null;
        this.particles = [];
        this.quantumLines = [];
        this.mouse = { x: 0, y: 0 };
        this.targetRotation = { x: 0, y: 0 };
        this.currentRotation = { x: 0, y: 0 };
        this.lights = [];
        this.circuitParticles = [];
        
        this.init();
        this.createRobot();
        this.createParticles();
        this.createQuantumLines();
        this.createFloatingCircuits();
        this.addEventListeners();
        this.animate();
        
        // Hide loading screen
        setTimeout(() => {
            document.getElementById('loading-screen').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('loading-screen').style.display = 'none';
            }, 500);
        }, 1500);
    }
    
    init() {
        const canvas = document.getElementById('hero-canvas');
        
        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000000);
        this.scene.fog = new THREE.Fog(0x000000, 10, 50);
        
        // Camera setup
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 2, 8);
        
        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: canvas,
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        
        // Lighting
        this.setupLighting();
    }
    
    setupLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
        this.scene.add(ambientLight);
        
        // Main spotlight
        const spotlight = new THREE.SpotLight(0xe30c14, 1, 30, Math.PI / 6, 0.1, 2);
        spotlight.position.set(0, 10, 5);
        spotlight.castShadow = true;
        spotlight.shadow.mapSize.width = 2048;
        spotlight.shadow.mapSize.height = 2048;
        this.scene.add(spotlight);
        
        // Fill light
        const fillLight = new THREE.DirectionalLight(0x444444, 0.5);
        fillLight.position.set(-5, 5, 5);
        this.scene.add(fillLight);
        
        // Rim light
        const rimLight = new THREE.DirectionalLight(0xe30c14, 0.3);
        rimLight.position.set(5, 2, -5);
        this.scene.add(rimLight);
    }
    
    createRobot() {
        this.robot = new THREE.Group();
        
        // Robot materials
        const bodyMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x2a2a2a,
            shininess: 100,
            specular: 0x444444
        });
        
        const glowMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xe30c14,
            emissive: 0xe30c14,
            emissiveIntensity: 0.3
        });
        
        const accentMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xa8040d,
            emissive: 0xa8040d,
            emissiveIntensity: 0.2
        });
        
        // Robot head
        const headGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.2);
        const head = new THREE.Mesh(headGeometry, bodyMaterial);
        head.position.y = 3;
        head.castShadow = true;
        this.robot.add(head);
        
        // Robot eyes
        const eyeGeometry = new THREE.SphereGeometry(0.15, 8, 8);
        const leftEye = new THREE.Mesh(eyeGeometry, glowMaterial);
        leftEye.position.set(-0.3, 3.2, 0.6);
        const rightEye = new THREE.Mesh(eyeGeometry, glowMaterial);
        rightEye.position.set(0.3, 3.2, 0.6);
        this.robot.add(leftEye);
        this.robot.add(rightEye);
        
        // Robot torso
        const torsoGeometry = new THREE.CylinderGeometry(0.8, 1.2, 2.5, 8);
        const torso = new THREE.Mesh(torsoGeometry, bodyMaterial);
        torso.position.y = 1;
        torso.castShadow = true;
        this.robot.add(torso);
        
        // Chest accent
        const chestGeometry = new THREE.RingGeometry(0.2, 0.4, 8);
        const chest = new THREE.Mesh(chestGeometry, accentMaterial);
        chest.position.set(0, 1.5, 0.8);
        this.robot.add(chest);
        
        // Arms
        const armGeometry = new THREE.CylinderGeometry(0.2, 0.25, 1.8, 8);
        const leftArm = new THREE.Mesh(armGeometry, bodyMaterial);
        leftArm.position.set(-1.2, 1, 0);
        leftArm.castShadow = true;
        const rightArm = new THREE.Mesh(armGeometry, bodyMaterial);
        rightArm.position.set(1.2, 1, 0);
        rightArm.castShadow = true;
        this.robot.add(leftArm);
        this.robot.add(rightArm);
        
        // Shoulder accents
        const shoulderGeometry = new THREE.SphereGeometry(0.3, 8, 8);
        const leftShoulder = new THREE.Mesh(shoulderGeometry, accentMaterial);
        leftShoulder.position.set(-1.2, 1.8, 0);
        const rightShoulder = new THREE.Mesh(shoulderGeometry, accentMaterial);
        rightShoulder.position.set(1.2, 1.8, 0);
        this.robot.add(leftShoulder);
        this.robot.add(rightShoulder);
        
        // Legs
        const legGeometry = new THREE.CylinderGeometry(0.25, 0.3, 2, 8);
        const leftLeg = new THREE.Mesh(legGeometry, bodyMaterial);
        leftLeg.position.set(-0.5, -1.5, 0);
        leftLeg.castShadow = true;
        const rightLeg = new THREE.Mesh(legGeometry, bodyMaterial);
        rightLeg.position.set(0.5, -1.5, 0);
        rightLeg.castShadow = true;
        this.robot.add(leftLeg);
        this.robot.add(rightLeg);
        
        // Store head reference for mouse tracking
        this.robotHead = head;
        
        // Add blinking lights
        this.createBlinkingLights();
        
        this.robot.position.y = -1;
        this.scene.add(this.robot);
    }
    
    createBlinkingLights() {
        const lightMaterial = new THREE.MeshBasicMaterial({ 
            color: 0xe30c14,
            transparent: true,
            opacity: 0.8
        });
        
        // Create small blinking lights around the robot
        for (let i = 0; i < 8; i++) {
            const lightGeometry = new THREE.SphereGeometry(0.05, 4, 4);
            const light = new THREE.Mesh(lightGeometry, lightMaterial);
            
            const angle = (i / 8) * Math.PI * 2;
            const radius = 2.5;
            light.position.set(
                Math.cos(angle) * radius,
                Math.sin(angle * 0.5) * 2 + 1,
                Math.sin(angle) * radius * 0.5
            );
            
            light.userData = { 
                originalOpacity: 0.8,
                blinkSpeed: 0.02 + Math.random() * 0.03,
                phase: Math.random() * Math.PI * 2
            };
            
            this.lights.push(light);
            this.scene.add(light);
        }
    }
    
    createParticles() {
        const particleCount = 200;
        const particleGeometry = new THREE.BufferGeometry();
        const positions = [];
        const colors = [];
        const sizes = [];
        
        for (let i = 0; i < particleCount; i++) {
            positions.push(
                (Math.random() - 0.5) * 50,
                (Math.random() - 0.5) * 50,
                (Math.random() - 0.5) * 50
            );
            
            const color = new THREE.Color();
            color.setHSL(0.0, 0.8, 0.3 + Math.random() * 0.4);
            colors.push(color.r, color.g, color.b);
            
            sizes.push(Math.random() * 2 + 1);
        }
        
        particleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        particleGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        particleGeometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
        
        const particleMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 }
            },
            vertexShader: `
                attribute float size;
                varying vec3 vColor;
                uniform float time;
                
                void main() {
                    vColor = color;
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    gl_PointSize = size * (300.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                varying vec3 vColor;
                
                void main() {
                    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
                    float alpha = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
                    gl_FragColor = vec4(vColor, alpha);
                }
            `,
            transparent: true,
            vertexColors: true
        });
        
        this.particles = new THREE.Points(particleGeometry, particleMaterial);
        this.scene.add(this.particles);
    }
    
    createQuantumLines() {
        for (let i = 0; i < 20; i++) {
            const points = [];
            const startPoint = new THREE.Vector3(
                (Math.random() - 0.5) * 30,
                (Math.random() - 0.5) * 30,
                (Math.random() - 0.5) * 30
            );
            
            for (let j = 0; j < 5; j++) {
                const point = startPoint.clone().add(
                    new THREE.Vector3(
                        (Math.random() - 0.5) * 10,
                        (Math.random() - 0.5) * 10,
                        (Math.random() - 0.5) * 10
                    )
                );
                points.push(point);
            }
            
            const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
            const lineMaterial = new THREE.LineBasicMaterial({ 
                color: 0xe30c14,
                transparent: true,
                opacity: 0.3
            });
            
            const line = new THREE.Line(lineGeometry, lineMaterial);
            line.userData = { 
                originalOpacity: 0.3,
                pulseSpeed: 0.01 + Math.random() * 0.02,
                phase: Math.random() * Math.PI * 2
            };
            
            this.quantumLines.push(line);
            this.scene.add(line);
        }
    }
    
    createFloatingCircuits() {
        const circuitCount = 30;
        
        for (let i = 0; i < circuitCount; i++) {
            const circuit = new THREE.Group();
            
            // Create circuit board base
            const boardGeometry = new THREE.PlaneGeometry(0.5, 0.3);
            const boardMaterial = new THREE.MeshPhongMaterial({ 
                color: 0x1a1a1a,
                transparent: true,
                opacity: 0.7
            });
            const board = new THREE.Mesh(boardGeometry, boardMaterial);
            circuit.add(board);
            
            // Add circuit traces
            const traceGeometry = new THREE.PlaneGeometry(0.4, 0.02);
            const traceMaterial = new THREE.MeshBasicMaterial({ 
                color: 0xa8040d,
                transparent: true,
                opacity: 0.8
            });
            
            for (let j = 0; j < 3; j++) {
                const trace = new THREE.Mesh(traceGeometry, traceMaterial);
                trace.position.y = (j - 1) * 0.1;
                trace.position.z = 0.001;
                circuit.add(trace);
            }
            
            // Position randomly around the scene
            circuit.position.set(
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20
            );
            
            circuit.userData = {
                rotationSpeed: {
                    x: (Math.random() - 0.5) * 0.02,
                    y: (Math.random() - 0.5) * 0.02,
                    z: (Math.random() - 0.5) * 0.02
                },
                floatSpeed: 0.005 + Math.random() * 0.01,
                floatAmplitude: 0.5 + Math.random() * 1,
                phase: Math.random() * Math.PI * 2
            };
            
            this.circuitParticles.push(circuit);
            this.scene.add(circuit);
        }
    }
    
    addEventListeners() {
        // Mouse move tracking
        window.addEventListener('mousemove', (event) => {
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            
            // Calculate target rotation based on mouse position
            this.targetRotation.y = this.mouse.x * 0.3;
            this.targetRotation.x = this.mouse.y * 0.2;
        });
        
        // Resize handling
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        const time = Date.now() * 0.001;
        
        // Update robot head rotation (smooth mouse tracking)
        if (this.robotHead) {
            this.currentRotation.x += (this.targetRotation.x - this.currentRotation.x) * 0.05;
            this.currentRotation.y += (this.targetRotation.y - this.currentRotation.y) * 0.05;
            
            this.robotHead.rotation.x = this.currentRotation.x;
            this.robotHead.rotation.y = this.currentRotation.y;
        }
        
        // Animate robot subtle movements
        if (this.robot) {
            this.robot.rotation.y += 0.002;
            this.robot.position.y = -1 + Math.sin(time * 0.5) * 0.1;
        }
        
        // Animate particles
        if (this.particles) {
            this.particles.rotation.y += 0.001;
            this.particles.material.uniforms.time.value = time;
        }
        
        // Animate blinking lights
        this.lights.forEach(light => {
            const userData = light.userData;
            const opacity = userData.originalOpacity * (0.3 + 0.7 * Math.sin(time * userData.blinkSpeed + userData.phase));
            light.material.opacity = opacity;
        });
        
        // Animate quantum lines
        this.quantumLines.forEach(line => {
            const userData = line.userData;
            const opacity = userData.originalOpacity * (0.5 + 0.5 * Math.sin(time * userData.pulseSpeed + userData.phase));
            line.material.opacity = opacity;
        });
        
        // Animate floating circuits
        this.circuitParticles.forEach(circuit => {
            const userData = circuit.userData;
            
            circuit.rotation.x += userData.rotationSpeed.x;
            circuit.rotation.y += userData.rotationSpeed.y;
            circuit.rotation.z += userData.rotationSpeed.z;
            
            circuit.position.y += Math.sin(time * userData.floatSpeed + userData.phase) * userData.floatAmplitude * 0.01;
        });
        
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize the scene when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new HeroScene();
});