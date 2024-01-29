import * as THREE from 'three';

// src
import Experience from './Experience.js';

//post processing
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass.js';
import {ShaderPass} from 'three/examples/jsm/postprocessing/ShaderPass.js';

import {CRTShader} from './postprocessing/crt/CRTShader.js';

export default class Renderer {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.camera = this.experience.camera;

    this.setRenderer();
  }

  setRenderer() {
    this.webglRenderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
    });

    this.webglRenderer.outputColorSpace = THREE.SRGBColorSpace;
    this.webglRenderer.toneMapping = THREE.CineonToneMapping;
    this.webglRenderer.toneMappingExposure = 1.75;
    this.webglRenderer.shadowMap.enabled = true;
    this.webglRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.webglRenderer.setSize(this.sizes.width, this.sizes.height);
    this.webglRenderer.setPixelRatio(this.sizes.pixelRatio);

    this.composer = new EffectComposer(this.webglRenderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera.perspectiveCamera));

    const crtEffect = new ShaderPass(CRTShader);
    this.composer.addPass(crtEffect);
  }

  resize() {
    this.webglRenderer.setSize(this.sizes.width, this.sizes.height);
    this.webglRenderer.setPixelRatio(this.sizes.pixelRatio);
  }

  update() {
    // this.webglRenderer.render(this.scene, this.camera.perspectiveCamera);
    this.composer.render();
  }
}
