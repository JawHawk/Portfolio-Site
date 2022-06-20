varying vec3 vertexNormal;

void main(){
   float intensity = pow(0.58 - dot(vertexNormal,vec3(0,0,1.0)),2.4);
  // gl_FragColor = vec4(0.3,0.6,1.0,1.0)* intensity;
   gl_FragColor = vec4(0.3,0.1,0.8,1.0)* intensity;

}