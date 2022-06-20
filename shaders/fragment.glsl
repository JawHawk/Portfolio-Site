uniform sampler2D globeTexture;
varying vec2 vertexUV; //vec2
varying vec3 vertexNormal;
export default;
void main() {
     //gl_FragColor =  vec4(vec3(0.5,0.3,0) + texture2D(globeTexture, vertexUV).xyz,1.0);
    
    //blue atmosphere
    float intensity = 1.05 - dot(vertexNormal, vec3(0.0,0.0,1.0));
    //vec3 atmosphere = vec3(0.3,0.6,1.0)* pow(intensity,1.5);
    vec3 atmosphere = vec3(0.3,0.6,1.0)* pow(intensity,1.5);

    gl_FragColor =  vec4(atmosphere + texture2D(globeTexture, vertexUV).xyz,1.0);
}