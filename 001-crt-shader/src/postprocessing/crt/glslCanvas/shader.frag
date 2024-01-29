#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform sampler2D u_texture_0;

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    vec3 color = vec3(0.0);

    vec4 previousPassColor = texture2D(u_texture_0, uv);
    color = previousPassColor.rgb;

    float o1 = uv.y * u_resolution.y;

    o1 = floor(o1);
    o1 = mod(o1, 2.0);
    o1 = step(1.0, o1);

    color *= o1;

	gl_FragColor = vec4(color,1.0);
}
