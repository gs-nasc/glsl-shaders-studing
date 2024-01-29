import {Vector2, Color} from 'three';
import vertexShader from './vertex_shader.glsl';
import fragmentShader from './fragment_shader.glsl';

const CRTShader = {
    name: "CRTShader",
    uniforms: {
        tDiffuse: { value: null },
        u_resolution: {value: new Vector2(window.innerWidth, window.innerHeight)},
        linesSize: {value: 2.0}
    },
    vertexShader,
    fragmentShader,
};

export {CRTShader};