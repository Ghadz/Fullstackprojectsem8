import * as THREE from "three";

export function getFresnelMat() {
  return new THREE.ShaderMaterial({
    uniforms: {
      fresnelBias: { value: 0.1 },
      fresnelScale: { value: 2.0 },
      fresnelPower: { value: 2.0 },
      fresnelColor: { value: new THREE.Color(0x0077ff) }
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vViewPosition;
      
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vViewPosition = -mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform float fresnelBias;
      uniform float fresnelScale;
      uniform float fresnelPower;
      uniform vec3 fresnelColor;
      
      varying vec3 vNormal;
      varying vec3 vViewPosition;
      
      void main() {
        vec3 normal = normalize(vNormal);
        vec3 viewDirection = normalize(vViewPosition);
        float fresnel = fresnelBias + fresnelScale * pow(1.0 - dot(viewDirection, normal), fresnelPower);
        gl_FragColor = vec4(fresnelColor, fresnel);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending
  });
} 