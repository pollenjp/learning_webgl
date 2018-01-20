// バーテックスシェーダーは、各頂点の位置や形状を定義します。
attribute vec3 aVertexPosition;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

void main(void){
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
}

