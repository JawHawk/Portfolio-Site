import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import {OrbitControls} from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js'

function main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({canvas,
        antialias:true,alpha:true});    //antialias removes jagginess 
    renderer.setSize(window.innerWidth,window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    
    const camera = new THREE.PerspectiveCamera(75,innerWidth/innerHeight,1,1000)
    
    camera.position.z = 15;
    
    const scene = new THREE.Scene();
    //new OrbitControls(camera,renderer.domElement);
   scene.background = new THREE.Color(0x000000);

    const loader = new THREE.TextureLoader();

    var mouseX,mouseY,windowHalfX,windowHalfY
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    mouseX = 0;
    mouseY = 0
    //sphere
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(5,50,50),new THREE.ShaderMaterial({
      vertexShader : 'varying vec2 vertexUV; varying vec3 vertexNormal; void main() {vertexUV = uv;vertexNormal = normalize(normalMatrix * normal);gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 ); }',

      fragmentShader: 'uniform sampler2D globeTexture; varying vec2 vertexUV; varying vec3 vertexNormal; void main() {float intensity = 1.05 - dot(vertexNormal, vec3(0.0,0.0,1.0)); vec3 atmosphere = vec3(0.3,0.6,1.0)* pow(intensity,1.5);gl_FragColor =  vec4(atmosphere + texture2D(globeTexture, vertexUV).xyz,1.0);}',

       uniforms: {
       globeTexture: {
         value: new THREE.TextureLoader().load('./img/globe.jpg')
       }
    }
    })     //map: new THREE.TextureLoader().load('./img/globe.jpg')
    )
    //scene.add(sphere)
   
    const atmosphere = new THREE.Mesh(new THREE.SphereGeometry(5,50,50),new THREE.ShaderMaterial({
      vertexShader : 'varying vec3 vertexNormal;void main() {vertexNormal = normalize(normalMatrix * normal); gl_Position = (projectionMatrix * modelViewMatrix * vec4( position, 1.0 ));  }',

      fragmentShader: 'varying vec3 vertexNormal;void main(){float intensity = pow(0.65 - dot(vertexNormal,vec3(0,0,1.0)),2.4);gl_FragColor = vec4(0.3,0.1,0.8,1.0)* intensity;}',
      blending:THREE.AdditiveBlending,
      side:THREE.BackSide
    })     //map: new THREE.TextureLoader().load('./img/globe.jpg')
    )

    atmosphere.scale.set(1.15,1.15,1.15)
   // scene.add(atmosphere)
   //========================================================================================================================//
   const parameters = {} 
   parameters.count = 1000

   const generate_galaxy = () =>{
     const particle_geometry = new THREE.BufferGeometry()

     const positions = new Float32Array(parameters.count*3)

     for(let i = 0; i < parameters.count; i++){
       const i3 = i*3

       positions[i3 + 0] = Math.random()
       positions[i3 + 1] = Math.random()
       positions[i3 + 2] = Math.random()
     }

     particle_geometry.setAttribute(
       'position',
       new THREE.BufferAttribute(positions,3)
     )
   }
   generate_galaxy()
    //-------------------------------------------------------------------------------//
    scene.fog = new THREE.FogExp2( 0x3e6bff, 0.0008,0.005);
    const vertices = [];
  
for ( let i = 0; i < 20000; i ++ ) {

	const x =  Math.random() * 2000 - 1000;
	const y = Math.random() * 2000 - 1000;
	const z =  Math.random() * 2000 - 1000;
  vertices.push( x, y, z );

}

const geometry = new THREE.BufferGeometry();
geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );


const material = new THREE.PointsMaterial( { color: 0xffffff ,size:1.5,map: loader.load(
  "img/white-sphere.jpg"
),
blending: THREE.AdditiveBlending,
transparent: true} );

const white_points = new THREE.Points( geometry, material );

//scene.add( white_points );

document.addEventListener( 'mousemove', onMouseMove, false );
function onMouseMove(e) {
  mouseX = e.clientX - windowHalfX;
  mouseY = e.clientY - windowHalfY;
}	

function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

    function render(time) {
      time *= 0.001;
      camera.position.x += ( mouseX - camera.position.x ) * 0.005;
		  camera.position.y += ( - mouseY - camera.position.y ) * 0.005;
      sphere.rotation.y = time
    camera.lookAt( scene.position );

      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }
      renderer.setSize(window.innerWidth,window.innerHeight)
      renderer.render(scene, camera);
  
      requestAnimationFrame(render);
    }
  
    requestAnimationFrame(render);
  }
  
  main();