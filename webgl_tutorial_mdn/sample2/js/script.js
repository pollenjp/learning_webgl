main();


// main
function main(){
    const canvas = document.getElementById("glcanvas");
    const gl = canvas.getContext('webgl');

    if(!gl){
        alert("WebGLは初期化できません。ブラウザはサポートされていません。");
        gl = null;
    }

    // バーテックスシェーダーは、各頂点の位置や形状を定義します。
    const vsSource = `
        attribute vec4 aVertexPosition;
        uniform mat4 uModelViewMatrix;
        uniform mat4 uProjectionMatrix;
        void main(void){
            gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
        }
    `;

    //ポリゴン内の各ピクセルは、GL の用語でフラグメントと呼びます。フラグメントシェーダーは、各ピクセルの色を決定します。今回の例では、各ピクセルには単純に白色を割り当てます。
    const fsSource = `
        void main(void){
            gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
        }
    `;

    const shaderProgram = initShaderProgram( gl, vsSource, fsSource);
    const programInfo = {
        program: shaderProgram,
        attribLocations: {
            vertexPosition: gl.getAttribLocation( shaderProgram, 'aVertexPosition'),
        },
        uniformLocations: {
            projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
            modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
        },
    };

    const buffers = initBuffers(gl);
    drawScene( gl, programInfo, buffers );

}
///////////////////////////////////////////////////




/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  function
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function initBuffers(gl){
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, positionBuffer );
    const positions = [
         1.0,  1.0,
        -1.0,  1.0,
         1.0, -1.0,
        -1.0, -1.0,
    ];
    gl.bufferData(  gl.ARRAY_BUFFER,
                    new Float32Array(positions),
                    gl.STATIC_DRAW  );
    return {
        position: positionBuffer,
    };
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function drawScene( gl, programInfo, buffers ){
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);   // enable depth testing
    gl.depthFunc(gl.LEQUAL);    // Near things obscure far things
    // clear the canvas before we start drawing on it.
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

    const fieldOfView = 45 * Math.PI / 180; // in radians
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;
    const projectionMatrix = mat4.create();
    mat4.perspective(   projectionMatrix,
                        fieldOfView,
                        aspect,
                        zNear,
                        zFar    );
    const modelViewMatrix = mat4.create();
    mat4.translate( modelViewMatrix,    // destination matrix
                    modelViewMatrix,    // matrix to translate
                    [-0.0, 0.0, -6.0]); // amount to translate

    {
        const numComponents = 2;
        const type = gl.FLOAT;
        const normalize = false;
        const stride = 0;
        const offset = 0;
        gl.bindBuffer( gl.ARRAY_BUFFER, buffers.position );
        gl.vertexAttribPointer( programInfo.attribLocations.vertexPosition,
                                numComponents,
                                type,
                                normalize,
                                stride,
                                offset);
        gl.enableVertexAttribArray( programInfo.attribLocations.vertexPosition );
    }

    gl.useProgram( programInfo.program );
    gl.uniformMatrix4fv(    programInfo.uniformLocations.projectionMatrix,
                            false,
                            projectionMatrix    );
    gl.uniformMatrix4fv(    programInfo.uniformLocations.modelViewMatrix,
                            false,
                            modelViewMatrix     );

    {
        const offset = 0;
        const vertexCount = 4;
        gl.drawArrays( gl.TRIANGLE_STRIP, offset, vertexCount );
    }
}



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function loadShader(gl, type, source){
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    // コンパイルの成功を確認
    if( !gl.getShaderParameter(shader, gl.COMPILE_STATUS) ){
        alert("シェーダーのコンパイルでエラーが発生しました: " + gl.getShaderInfoLog(shader) );
        return null;
    }
    return shader;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function initShaderProgram( gl, vsSource, fsSource ){
    var vertexShader = loadShader( gl, gl.VERTEX_SHADER, vsSource );
    var fragmentShader = loadShader( gl, gl.FRAGMENT_SHADER, fsSource );
    // シェーダープログラムを作成
    shaderProgram = gl.createProgram();
    // ２つのシェーダーと接続
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    // リンクする　
    gl.linkProgram(shaderProgram);
    // If createing the shader program failed, alert.
    if ( !gl.getProgramParameter(shaderProgram, gl.LINK_STATUS) ){
        alert("シェーダープログラムを作成を初期化できません。");
    }

    return shaderProgram;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

