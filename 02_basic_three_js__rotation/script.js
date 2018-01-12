// シーンの作成
var scene = new THREE.Scene();


// サイズの決定
var width   = 600;
var height  = 400;

// レンダラーの設置
var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
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
directionalLight.position.set(0, 1, 1);
scene.add(directionalLight);


// 物体の追加
var geometry = new THREE.CubeGeometry(30, 30, 30);
var material = new THREE.MeshPhongMaterial( {color: 0x00ff00} );
var mesh = new THREE.Mesh(geometry, material);
scene.add( mesh );


function animate(){
    requestAnimationFrame( animate );

    mesh.rotation.y += 0.01;
    mesh.rotation.z += 0.01;

    // レンダリング
    renderer.render(scene, camera)
}

animate();


