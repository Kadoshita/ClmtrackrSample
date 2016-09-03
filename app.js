var localVideo = document.getElementById('inputVideo');
var localStream;

startVideo();
// start local video
function startVideo() {
	navigator.mediaDevices.getUserMedia({video: true, audio: false})
	.then(function (stream) { // success
		localStream = stream;
		localVideo.src = window.URL.createObjectURL(localStream);
	})
	.catch(function (error) { // error
		console.error('mediaDevice.getUserMedia() error:', error);
		return;
	});
}

var tracker = new clm.tracker();
tracker.init(pModel);
var positions = tracker.getCurrentPosition();
tracker.start(localVideo);
var box = [0, 0, 400, 260];
tracker.start(localVideo, box);
var canvasInput = document.getElementById('canvas');
var cc = canvasInput.getContext('2d');

function drawLoop() {
	requestAnimationFrame(drawLoop); // ここで毎フレームdrawLoopを呼び出すように設定します。
	cc.clearRect(0, 0, canvasInput.width, canvasInput.height); // 毎フレーム出力用のキャンバスをクリアします。これをしないと重ね書きのようになってしまいます。
	tracker.draw(canvasInput); // 判定結果をcanvasに描画します。
}
drawLoop();