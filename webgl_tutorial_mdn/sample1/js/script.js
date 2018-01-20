main();


// main
function main(){
    const canvas = document.getElementById("glcanvas");
    const gl = canvas.getContext'webgl');

    if(!gl){
        alert("WebGLは初期化できません。ブラウザはサポートされていません。");
        gl = null;
    }

    // バーテックスシェーダーは、各頂点の位置や形状を定義します。
    const vsSource = `
        attribute vec4 aVertexPosition;
        uniform mat4 uModelViewMatrix;
        uniform mat4 uPMatrix;
        void main(void){
            gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
        }
    `;

    //ポリゴン内の各ピクセルは、GL の用語でフラグメントと呼びます。フラグメントシェーダーは、各ピクセルの色を決定します。今回の例では、各ピクセルには単純に白色を割り当てます。
    const fsSource = `
        void main(void){
            gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
        }
    `;

    const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
    const ProgramInfo = {
        program: shaderProgram,
        attribLocations: {
            vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
        },
        uniformLocations: {
            projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
            modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
        },
    };

}



function initWebGL(canvas){
    gl = null;

    try{
        gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        // この１文にはjsの副作用が使われている。
    }
    catch(e){}



    return gl;
}


// シェーダーの初期化
function initShaders(){
    var fragmentShader = getShader(gl, "shader-fs");
    var vertexShader = getShader(gl, "shader-vs");

    // シェーダープログラムを作成
    shaderProgram = gl.createProgram();
    // ２つのシェーダーと接続
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    // リンクする　
    gl.linkProgram(shadeProgram);

    // シェーダープログラムを作成できない場合はアラートを表示

    if ( !gl.getProgramParameter(shadeProgram, gl.LINK_STATUS) ){
        alert("シェーダープログラムを作成を初期化できません。");
    }

    // シェーダープログラムをアクディブ化
    gl.useProgram(shaderProgram);

    vertexPositionAttribute = gl.getAttribLocation( shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(vertexPositionAttribute);
}


// DOMからシェーダーを読み込む
// getShader() ルーチンは、DOM から指定された名称のシェーダープログラムを取り出し、コンパイルされたシェーダープログラムを呼び出し元へ返すか、シェーダーの読み込みやコンパイルができなかった場合に null を返します。
function getShader(gl, id){
    var shaderScript, theSource, currentChild, shader;

    shaderScript = document.getElementById(id);

    if( !shaderScript ){
        return null;
    }

    // 指定した ID の要素が見つかった場合は、そのテキストを変数 theSource に格納します。
    theSource = "";
    currentChild = shaderScript.firstChild;

    while( currentChild ){
        if( currentChild.nodeType == currentChild.TEXT_NODE ){
            theSource += currentChild.textContent;
        }

        // https://developer.mozilla.org/ja/docs/Web/API/Node/nextSibling
        currentChild = currentChild.nextSibling;
    }

    // シェーダーのコードを読み込んだら、シェーダーオブジェクトがバーテックスシェーダー (MIME タイプ "x-shader/x-vertex") あるいはフラグメントシェーダー (MIME タイプ "x-shader/x-fragment") であることを判断するために MIME タイプの確認を行い、そして取り出したソースコードから適切なタイプのシェーダーを生成します
    if( shaderScript.type == "x-shader/x-fragment"){
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    }else if (shaderScript.type == "x-shader/x-vertex"){
        shader = gl.createShader(gl.VERTEX_SHADER);
    } else {
        return null;
    }

    // 最後に、ソースコードはシェーダーに渡され、そしてコンパイルされます。シェーダーのコンパイル時にエラーが発生した場合は、警告を表示して null 値を返します。エラーが発生しなかった場合は、コンパイル済みのシェーダーを呼び出し元に返します。
    gl.shaderSource(shader, theSource);
    // シェーダープログラムをコンパイル
    gl.compileShader(shader);
    // コンパイルの成功を確認
    if( !gl.getShaderParameter(shader, gl.COMPILE_STATUS){
        alert("シェーダーのコンパイルでエラーが発生しました: " + gl.getShaderInfoLog(shader) );
        return null;
    }
    return shader;
    }





