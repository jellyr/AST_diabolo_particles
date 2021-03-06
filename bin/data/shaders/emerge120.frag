#version 130
#extension GL_ARB_texture_rectangle : enable

uniform sampler2DRect tex0;

uniform vec3 c1;
uniform vec3 c2;
uniform vec3 c3;

vec3 gu(vec4 a,vec4 b,float f){
    return mix(a.xyz,b.xyz,(f-a.w)*(1.0/(b.w-a.w)));
    //return mix(a.xyz,b.xyz,f/4);
}

vec3 grad(float f){
    vec4 c01=vec4(0.0,0.0,0.0,0.00);
    // vec4 c02=vec4(0.5,0.0,0.0,0.50);
    // vec4 c03=vec4(1.0,0.0,0.0,0.55);
    // vec4 c04=vec4(1.0,1.0,0.0,0.80);
    vec4 c02=vec4(c1,0.50);
    vec4 c03=vec4(c2,0.55);
    vec4 c04=vec4(c3,0.80);
    vec4 c05=vec4(1.0,1.0,1.0,1.00);
    return (f<c02.w)?gu(c01,c02,f):
    (f<c03.w)?gu(c02,c03,f):
    (f<c04.w)?gu(c03,c04,f):
    gu(c04,c05,f);
}

void main()
{
    vec4 color = vec4(0,0,0,0);
    int i;
    int j;
    float f;
    float a;
	for(i = -1; i<1; i++){
		for(j = -1; j<1; j++){
	 		f += texture2DRect(tex0, gl_TexCoord[0].st + vec2(i,j)).x;
		}
	}
	vec3 g = grad(f/4);
	a = (g.x > 0.1 || g.y > 0.1 || g.z > 0.1)? 1.0 : 0; 
	//a = 1.0;
	gl_FragColor = vec4(g.x, g.y, g.z, a);
}