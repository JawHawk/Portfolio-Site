uniform float time;
uniform float progress;
uniform sampler2D texture1;
uniform vec4 resolution;
varying vec2 vUV;
uniform vec3 vPosition;
float PI = 3.141592653589;

void main() {
   vUV = uv;
   gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 ); //3js docs webgl 
}
//necesarry code for vertex.glsl to work
