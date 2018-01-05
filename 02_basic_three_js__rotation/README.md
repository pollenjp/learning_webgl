# 02 Basic Three.js --rotation--


```
/
|
|-- 01_basic_three_js/
|   |-- README.md
|   |-- code/
|   |   |-- 
|
|-- 02_basic_three_js/
|   |-- README.md           <--
|   |-- code/
|   |   |-- 
```

# 回転モーションを加える
レンダリングの部分のコードを以下のように変更
```
function animate(){
    requestAnimationFrame( animate );   // (1)

    mesh.rotation.y += 0.01;            // (2)
    mesh.rotation.z += 0.01;            // (3)

    // レンダリング
    renderer.render(scene, camera)      // (4)
}

animate();
```
<a href="https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame">requestAnimationFrame</a>は簡単に言えば、ブラウザ上で再描画される前に引数として渡された関数を実行することを要求する関数です。
つまり、再開がされる処理が行われる度にその直前で、(1)-(4)の処理が行われることになります。


# 実行結果


# 参考
- <a href="https://threejs.org/docs/#manual/introduction/Creating-a-scene">Creating a scene - three.js docs</a>
- <a href="https://html5experts.jp/yomotsu/5225/">初心者でも絶対わかる、WebGLプログラミング＜three.js最初の一歩＞ | HTML5Experts.jp</a>
- <a href="https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame">window.requestAnimationFrame - Web API インターフェイス | MDN</a>

