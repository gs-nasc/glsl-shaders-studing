varying vec2 vUv;

uniform vec2 u_resolution;
uniform sampler2D tDiffuse;

uniform float linesSize;


void main() {
    vec4 previousPassColor = texture2D(tDiffuse, vUv);    
    vec3 color = previousPassColor.rgb;

    float o1 = vUv.y * u_resolution.y;

    o1 = floor(o1);
    o1 = mod(o1, linesSize);
    o1 = step(linesSize / 2.0, o1);

    vec3 nc = color * o1;

    gl_FragColor = vec4(nc, previousPassColor.a);
}