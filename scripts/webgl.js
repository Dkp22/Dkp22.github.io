// WebGL context and state variables
let gl;
let animationFrameId;
let isRunning = false;

// Initialize WebGL context and setup
function initWebGL() {
    console.log('Initializing WebGL...');
    const canvas = document.getElementById('webgl-canvas');
    
    // Set canvas size
    canvas.width = 800;
    canvas.height = 600;
    
    // Get WebGL context
    gl = canvas.getContext('webgl');
    if (!gl) {
        console.error('WebGL not supported');
        return;
    }
    
    // Set clear color to black
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    
    // Create and compile shaders
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, `
        attribute vec4 aPosition;
        void main() {
            gl_Position = aPosition;
        }
    `);
    
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, `
        precision mediump float;
        void main() {
            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        }
    `);
    
    // Create program
    const program = createProgram(gl, vertexShader, fragmentShader);
    if (!program) return;
    
    // Create buffer and set attributes
    const positions = new Float32Array([
        0.0, 0.0, 0.0,
        0.5, 0.0, 0.0,
        0.0, 0.5, 0.0
    ]);
    
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    
    const positionAttributeLocation = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);
    
    // Store program for later use
    gl.program = program;
}

// Create and compile a shader
function createShader(gl, type, source) {
    console.log('Creating shader...');
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    
    return shader;
}

// Create and link a program
function createProgram(gl, vertexShader, fragmentShader) {
    console.log('Creating program...');
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Program linking error:', gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
    }
    
    return program;
}

// Render function
function render() {
    console.log('Rendering frame...');
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(gl.program);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
}

// Animation loop
function animate() {
    if (!isRunning) return;
    render();
    animationFrameId = requestAnimationFrame(animate);
}

// Start animation
function start() {
    console.log('Starting animation...');
    isRunning = true;
    animate();
}

// Stop animation
function stop() {
    console.log('Stopping animation...');
    isRunning = false;
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
}

// Event listeners
document.getElementById('start-btn').addEventListener('click', start);
document.getElementById('stop-btn').addEventListener('click', stop);

// Initialize when the page loads
window.addEventListener('load', initWebGL); 