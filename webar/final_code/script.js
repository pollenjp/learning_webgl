/*  WebAR for komabasai2017
    change to readable code */

// create Scene
var scene = new THREE.Scene();



// size definition
var width   = 640;
var height  = 480;

// renderer
var renderer = new THREE.WebGLRenderer({
    antialias: true,    /*anti-aliasing*/
    alpha: true         /*transparency*/
});
renderer.setSize(width, height);

// set renderer position on display
renderer.domElement.style.position = "absolute";
renderer.domElement.style.top = "0px";
renderer.domElement.style.left = "0px";

// add renderer to html
document.body.appendChild(renderer.domElement);


// camera setting
var camera = new THREE.Camera();
scene.add(camera);


// light setting
var light = new THREE.DirectionalLight(0xffffff);
light.position.set(0, 0, 2);
scene.add(light);


/***************************************************
 **    ArToolkitSource  --  marker tracking     ****
 ***************************************************/
var source = new THREEx.ArToolkitSource({
    sourceType: "webcam",   /* (default) */ /* smartphone support */
});
source.init(function onReady() {
    onResize();
});


// resize event --> call onResize()
window.onresize = onResize;
/*  (same as below)
    window.addEventListener("resize", function() { onResize(); });  */

function onResize(){
    // resizing
    source.onResizeElement();
    source.copyElementSizeTo(renderer.domElement);
    if(context.arController !== null){
        source.copyElementSizeTo(context.arController.canvas);
    }
}


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


////////////////////////////////////////////////////////////////////////////
//markerObject( patternPath,
//              gltfPath)
// hiro-marker
markerObject( "./patt/hiro.patt",
              "./gltf/face/face.gltf");
// kanji-marker
markerObject( "./patt/kanji.patt",
              "./gltf/monkey/monkey.gltf");
// utv-marker
markerObject( "./patt/ut-virtual.patt",
              "./gltf/geometory03/geometory03.gltf");
// tamago_ware
var gltf = null;
var mixer = null;
var clock = new THREE.Clock();
markerAnimation(
        "./patt/utvirtual_tamagohibiware_pattern_marker.patt",
        "./gltf/utvirtual_3d_logo_pollenjp02/utvirtual_3d_logo_pollenjp02.gltf"
        );
//////////////////////////////////////////////////////////////////////////////
animate();
renderScene();
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////


function markerObject(pattPath, gltfPath){
    // static object
    var _marker = new THREE.Group();
    var _controls = new THREEx.ArMarkerControls(context, _marker, {
        type: "pattern",
        patternUrl: pattPath,
    });
    scene.add(_marker);

    var loader = new THREE.GLTFLoader();
    loader.load(gltfPath, function( gltf ){
        _marker.add( gltf.scene );
        gltf.animations;
        gltf.scene;
        gltf.scenes;
        gltf.cameras;
    });
}


function markerAnimation(pattPath, gltfPath){
    // animation object
    var _marker = new THREE.Group();
    var _controls = new THREEx.ArMarkerControls(context, _marker, {
        type: "pattern",
        patternUrl: pattPath,
    });
    scene.add(_marker);

    var _loader = new THREE.GLTFLoader();
    _loader.load(
            // resource URL
            gltfPath,

            // called when the resource is loaded
            function( gltf ){
                var _animations = gltf.animations;
                if ( _animations && _animations.length ) {
                    mixer = new THREE.AnimationMixer( gltf.scene );
                    // one loop animation the object from beggining to end
                    for ( var i = 0; i < _animations.length; i ++ ) {
                        var _animation = _animations[ i ];
                        mixer.clipAction( _animation ).play();
                    }
                }
                _marker.add( gltf.scene );
                //gltf.animations;  /* tell me */
                //gltf.scene;
                //gltf.scenes;
                //gltf.cameras;
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
}


function renderScene() {
    requestAnimationFrame(renderScene);
    if(source.ready === false)    { return; }
    context.update(source.domElement);
    renderer.render(scene, camera);
}

function animate() {
    requestAnimationFrame( animate );
    if (mixer) mixer.update(clock.getDelta());
}

