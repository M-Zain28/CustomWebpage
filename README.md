# 3D Futuristic Hero Section with Three.js

A responsive 3D animated hero section featuring a futuristic robot with cursor tracking, particle effects, and quantum-style ambiance. Perfect for tech companies, AI startups, and digital agencies.

## ✨ Features

### 🤖 Interactive 3D Robot
- **Cursor Tracking**: Robot head smoothly follows mouse movement
- **Glowing Effects**: Red/neon accents using brand color palette (#e30c14, #a8040d, #e50914)
- **Blinking Lights**: Animated indicator lights around the robot
- **Subtle Animations**: Gentle floating and rotation movements

### 🌟 Atmospheric Effects
- **Particle System**: 200+ floating particles with custom shaders
- **Quantum Lines**: Pulsing interconnected lines for tech ambiance
- **Floating Circuits**: Animated circuit boards with glowing traces
- **Hologram Scan Lines**: Scanning effect across the scene
- **Fog Effect**: Depth-enhancing atmospheric fog

### 🎨 Visual Design
- **Dark Futuristic Theme**: Pure black background (#000000)
- **Brand Colors**: Consistent red color palette throughout
- **Glowing Typography**: Animated text with brand-colored glow effects
- **Responsive CTA Button**: Hover effects and smooth transitions

### 📱 Responsive & Performance
- **Fully Responsive**: Works on desktop, tablet, and mobile devices
- **GPU Optimized**: Efficient rendering with performance monitoring
- **Intersection Observer**: Pauses animation when not visible
- **Minimal Dependencies**: Only Three.js required

## 🚀 Quick Start

### Option 1: Standalone Page
Simply open `index.html` in your browser or serve it from a web server.

### Option 2: WordPress Elementor Widget
1. In WordPress admin, go to your page/post editor
2. Add an **HTML Widget** from Elementor
3. Copy the entire content from `elementor-widget.html`
4. Paste it into the HTML widget
5. Update/publish your page

## 📁 File Structure

```
├── index.html              # Standalone full-page version
├── hero-scene.js          # Main Three.js scene logic
├── elementor-widget.html  # WordPress Elementor widget version
└── README.md             # This documentation
```

## 🎛️ Customization Options

### Brand Colors
Edit the color values in the CSS and JavaScript:

```css
/* Primary brand color */
color: #e30c14;

/* Secondary brand color */
color: #a8040d;

/* Accent color */
color: #e50914;
```

### Text Content
Modify the hero text in the HTML:

```html
<h1>Your Custom Title Here</h1>
<p>Your custom subtitle text</p>
<button>Your CTA Text</button>
```

### Robot Appearance
Adjust robot materials in `hero-scene.js`:

```javascript
const glowMaterial = new THREE.MeshPhongMaterial({ 
    color: 0xe30c14,           // Eye color
    emissive: 0xe30c14,        // Glow effect
    emissiveIntensity: 0.3     // Glow intensity
});
```

### Animation Speed
Control animation speeds:

```javascript
// Robot rotation speed
this.robot.rotation.y += 0.002;

// Particle rotation speed  
this.particles.rotation.y += 0.001;

// Head tracking sensitivity
this.targetRotation.y = this.mouse.x * 0.3;
```

### Particle Count
Adjust particle density for performance:

```javascript
const particleCount = 200; // Reduce for better performance
```

## 🔧 Advanced Configuration

### Custom Robot Model
Replace the procedural robot with a custom GLTF model:

```javascript
const loader = new THREE.GLTFLoader();
loader.load('path/to/your/robot.gltf', (gltf) => {
    this.robot = gltf.scene;
    this.scene.add(this.robot);
});
```

### Lighting Setup
Customize the lighting configuration:

```javascript
// Main spotlight color and intensity
const spotlight = new THREE.SpotLight(0xe30c14, 1, 30, Math.PI / 6, 0.1, 2);

// Ambient light level
const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
```

### Camera Position
Adjust the camera for different viewing angles:

```javascript
this.camera.position.set(0, 2, 8); // x, y, z coordinates
```

## 📱 Mobile Optimization

The hero section is fully responsive and includes:

- **Clamp-based Typography**: Scales smoothly across devices
- **Touch-friendly**: CTA button sized for mobile interaction
- **Performance Scaling**: Reduced particle count on mobile
- **Viewport Optimization**: Proper mobile viewport handling

## 🌐 Browser Compatibility

- **Chrome**: 60+
- **Firefox**: 60+
- **Safari**: 12+
- **Edge**: 79+
- **Mobile Browsers**: iOS Safari 12+, Chrome Mobile 60+

## ⚡ Performance Tips

1. **Particle Count**: Reduce `particleCount` for lower-end devices
2. **Shadow Quality**: Lower `shadow.mapSize` for better performance
3. **Animation Frame Rate**: Add frame rate limiting for mobile
4. **Texture Optimization**: Use compressed textures for custom models

## 🎯 WordPress Integration

### Elementor HTML Widget
1. Copy `elementor-widget.html` content
2. Paste into Elementor HTML widget
3. Adjust container height as needed
4. Customize colors to match your theme

### Theme Integration
For theme integration, include the files in your theme and enqueue them:

```php
wp_enqueue_script('three-js', 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js');
wp_enqueue_script('hero-scene', get_template_directory_uri() . '/hero-scene.js', array('three-js'));
```

## 🔍 Troubleshooting

### Common Issues

**Hero not loading:**
- Check browser console for JavaScript errors
- Ensure Three.js CDN is accessible
- Verify canvas element exists

**Performance issues:**
- Reduce particle count
- Lower shadow quality
- Disable animations on mobile

**Responsive issues:**
- Check viewport meta tag
- Verify CSS media queries
- Test on actual devices

### Debug Mode
Enable debug mode by adding to the scene:

```javascript
// Add axes helper
const axesHelper = new THREE.AxesHelper(5);
this.scene.add(axesHelper);

// Add performance monitor
const stats = new Stats();
document.body.appendChild(stats.dom);
```

## 📄 License

This project is open source and available under the [MIT License](https://opensource.org/licenses/MIT).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🌟 Credits

- **Three.js**: 3D graphics library
- **Design**: Futuristic robot and particle effects
- **Animations**: Custom shaders and interactive elements

---

**Need help?** Create an issue or contact support for assistance with implementation or customization.