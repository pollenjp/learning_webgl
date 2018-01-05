# WebGL - WebAR
To save my code and article

```
./
|
|-- 01_basic_three_js
|   |-- 
```



# シーンの作成
<a href="https://threejs.org/docs/#manual/introduction/Creating-a-scene">Creating a scene - three.js docs</a>


# レンダラーの設置
HTMLファイルを読み込んだ時にブラウザ上で表示させるために、レンダラーを通してDOMを加えます。
<a href="https://threejs.org/docs/#api/renderers/WebGLRenderer">WebGLRenderer - three.js docs</a>

```js
// サイズの決定
var width   = 600;
var height  = 400;

// レンダラーの設置
var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);
```

widthとheightを決め、その値を引数として渡す。

レンダリングは最後にします。


# カメラを準備

```js
// カメラの準備
var vfov     = 60;              /* vertical field of view */
var aspect  = width / height;   // aspect ratio
var near    = 0.1;              /* near plane */
var far     = 1000;             /* far plane */
// カメラ作成
var camera = new THREE.PerspectiveCamera(vfov, aspect, near, far);
camera.position.set(0, 0, 50);  /* カメラの位置を指定 */
```

<a href="https://threejs.org/docs/#api/cameras/PerspectiveCamera">PerspectiveCamera</a>は以下の４つの引数を必要とします。
- vertical field of view: カメラの垂直方向の視野角
- aspect ratio: カメラの縦横比
- near plane: これより近い距離は表示されない。
- far plane: これより離れた距離は表示されない。


次に3D空間内におけるカメラの設置位置をpositionというプロパティーに指定しています。
positionはx,y,zの値を指定可能であり、それぞれの値を直接書き換えることもできます。（以下のコード参照）
```js
camera.position.x = 0
camera.position.y = 0
camera.position.z = 50
```

__カメラインスタンスのpositionプロパティについて：__
positionについてドキュメントを見ようと思ったときに<a href="https://threejs.org/docs/#api/cameras/PerspectiveCamera">PerspectiveCameraの公式ドキュメント</a>に載っていなかったのでどこに書かれているのかなと思ったのですが、ソースコードを見るとcallで呼び出していました（下の動画参照）。

![20180104_search_js_sorce_code_for_qiita2.gif](https://qiita-image-store.s3.amazonaws.com/0/195174/5f1e68fe-440e-163b-39dd-f354894dfbaa.gif)


# 光源の準備
光源を配置することで光の当り具合などを調整できます。
```js
// 光源の追加
var directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(0, 1, 1);
scene.add(directionalLight);
```

光源にはいくつか種類があります。
- DirectionalLight: 平方光源
- PointLight: 点光源
- AmbientLight: 自然な光（光の乱反射を表現）


# 物体の準備
```js
// 物体の準備
var geometry = new THREE.CubeGeometry(30, 30, 30);
var material = new THREE.MeshPhongMaterial( {color: 0x00ff00} );
var mesh = new THREE.Mesh(geometry, material);
scene.add( mesh );
```


# レンダリング
最後にレンダラーを使ってレンダリングを行う。


# 実行結果


# 参考
- <a href="https://html5experts.jp/yomotsu/5225/">初心者でも絶対わかる、WebGLプログラミング＜three.js最初の一歩＞ | HTML5Experts.jp</a>
- <a href="https://github.com/mrdoob/three.js/wiki/Getting-Started">Getting Started · mrdoob/three.js Wiki</a>
- <a href="https://liginc.co.jp/315939">three.jsの基本をおさらいしてみよう！〜基礎の基礎編〜 | 株式会社LIG</a>
