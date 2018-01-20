# WebAR
I created WebAR application.

```
./
|-- blend/
|-- css/
|-- data/
|-- demo_pic/
|-- gltf/
|-- images/
|-- js/
|   |-- GLTFLoader.js
|   |-- OBJLoader.js
|   |-- Tween.js
|   |-- ar.min.js
|   |-- three.min.js
|
|-- patt/
|
|-- README.md
|-- ar.html
|-- index.html
|-- script.js
|-- 
```


## ArToolKitContext  -- camera parameter / marker detection

```js:script.js
/******************************************************************
  ****  ArToolKitContext  -- camera parameter / marker detection **
  *****************************************************************/
var context = new THREEx.ArToolkitContext({
    debug: false,                                   /* default */
    cameraParametersUrl: "./data/camera_para.dat",
    detectionMode: "mono",                          /* default */ // ???
    //detectionMode: "color",
    imageSmoothingEnabled: true,
    //maxDetectionRate: 60,
    canvasWidth: source.parameters.sourceWidth,
    canvasHeight: source.parameters.sourceHeight,
});
context.init(function onCompleted(){
    camera.projectionMatrix.copy(context.getProjectionMatrix());
});
```

- ArToolkitContext
    - detectionMode
        - color: mk_patt (marker pattern)
        - color_and_matrix: 2D-barcode-type
        - mono: mk_patt (marker pattern)
        - mono_and_matrix: 2D-barcode-type


## reference
- <a href="https://qiita.com/mkoku/items/48b39e2750bceb72fbf6">Three.js + AR.js + Tween.js で遊ぶ - Qiita</a>
- <a href="https://threejs.org/docs/#api/renderers/WebGLRenderer">WebGLRenderer - three.js docs</a>
- <a href="https://jeromeetienne.github.io/AR.js/three.js/">threex-artoolkit | AR.js</a>

## プラス1
- <a href="https://artoolkit.org/documentation/doku.php?id=3_Marker_Training:marker_training">Creating and Training Traditional Template Square Markers [ARToolkit]</a>
