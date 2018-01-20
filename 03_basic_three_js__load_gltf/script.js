// シーンの作成
var scene = new THREE.Scene();


// サイズの決定
var width   = 600;
var height  = 400;

// レンダラーの設置
var renderer = new THREE.WebGLRenderer({ 
    antialias: true,
    alpha: true,
});
renderer.setClearColor( 0xaaaaaa );
renderer.setSize(width, height);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);


// カメラの準備
var vfov     = 60;              /* vertical field of view */
var aspect  = width / height;   // aspect ratio
var near    = 0.1;              /* near plane */
var far     = 1000;             /* far plane */
// カメラ作成
var camera = new THREE.PerspectiveCamera(vfov, aspect, near, far);
camera.position.set(0, 0, 50);  /* カメラの位置を指定 */


// 光源の追加
var directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(0, 50, 50);
scene.add(directionalLight);


// 物体の追加
var geometry = new THREE.CubeGeometry(1, 1, 1);
var material = new THREE.MeshPhongMaterial( {color: 0x00ff00} );
var mesh = new THREE.Mesh(geometry, material);
mesh.position.set(10, 2, 3);
mesh.rotation.set(45, 45, 45);
scene.add( mesh );



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


// レンダリング
function render() {
    requestAnimationFrame( render );
    renderer.render( scene, camera );   /* rendering */
}

render();

