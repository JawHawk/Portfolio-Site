varying vec3 vertexNormal;

void main() {
   vertexNormal = normalize(normalMatrix * normal);
   gl_Position = (projectionMatrix * modelViewMatrix * vec4( position, 1.0 )); //3js docs webgl 
}
//necesarry code for vertex.glsl to work
