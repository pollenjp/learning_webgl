# 03 Basic Three.js --gltf-- 


```shell
/
|
|-- 03_basic_three_js/
    |-- README.md           <--
    |-- index.html
    |-- script.js
    |-- js/
        |-- three.js
        |-- three.min.js
        |-- GLTFLoader.js
        |-- OrbitControls.js
```

## GLTFLoader
GLTFファイルとはブラウザ上で扱う３Dファイルの標準的な形式です。
今回はgltfファイルに保存した３DモデルをThree.jsで表示します。

01 Bassic Three.jsで用いたコードに以下の２点を加えるだけでできます。
1. jsディレクトリ内に新たに
    - GLTFLoader.js
    - OrbitControls.js
    のライブラリを加える
2. gltfファイルを読み込むコードを追加する


## jsディレクトリにライブラリを追加
それぞれ以下の場所にあるのでコピーして持ってくる。

```
Three.js/examples/js/loaders/GLTFLoader.js
Three.js/examples/js/controls/OrbitControls.js
```


## gltfファイルを読み込むコードを追加する

```js:script.js
//  gltfloader
var loader = new THREE.GLTFLoader();
loader.load(
        // resource URL
        './gltf/monkey/monkey.gltf',

        // called when the resource is loaded
        function ( gltf ) {
            var object = gltf.scene;
            object.scale.set(10, 10, 10);
            object.position.set(5, 5, 5);

            scene.add( object );
        },

        // called when loading is in progresses
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },

        // called when loading has errors
        function ( error ) {
            console.log( 'An error happened' );
        }
);


// OrbitControls
controls = new THREE.OrbitControls( camera, renderer.domElement );


// レンダリング
function render() {
    requestAnimationFrame( render );
    renderer.render( scene, camera );   /* rendering */
    controls.update();                  /* update */
}

render();
```

<a href="https://threejs.org/docs/#examples/loaders/GLTFLoader">GLTFLoader</a>は以下の４つを引数にとります。 
- gltfファイルを保存している場所へのパス
- 上手くGLTFファイルを読み込めた時に実行する関数
- 読み込み中に実行される関数
- エラーが出た時の関数

コードの通り、上手く読み込めた時の処理として、３Dオブジェクトのサイズと配置を指定して、それをシーンに加えています。

また、OrbitControlsを使ってgltfのオブジェクトを表示させている。


# 実行結果


# 参考
- <a href="https://threejs.org/docs/#examples/loaders/GLTFLoader">GLTFLoader - three.js docs</a>
- <a href="http://jsdo.it/cx20/2Tiv"></a>
