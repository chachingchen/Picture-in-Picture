const videoElement = document.getElementById('video');
const button = document.getElementById('button');

// Prompt user to select media stream, pass to video element, then play
async function selectMediaStream() {
	try {
		//const mediaStream = await navigator.mediaDevices.getDisplayMedia();

		//get laptop camera, with picture in picture
		var constraints = { audio: false, video: { width: 1280, height: 720 } };
		const mediaStream = navigator.mediaDevices.getUserMedia(constraints)
		.then(function(mediaStream) {
		  var video = document.querySelector('video');
			  video.srcObject = mediaStream;
			  video.onloadedmetadata = function(e) {
			    video.play();
			  };
			})
		.catch(function(err) { console.log(err.name + ": " + err.message); }); // always check for errors at the end.
		//the media stream will pass to a video source object 
		videoElement.srcObject = mediaStream;
		//once video is loaded, the video will play
		videoElement.onloadedmetadata = () => {
			videoElement.play();
		}
	} catch(error) {
		console.log('error here: ', error);
	}
}

button.addEventListener('click', async () => {
	// Disable button
	button.disable = true;
	//Start Picture in Picture
	await videoElement.requestPictureInPicture();
	//Reset Button only if video picture in picture is succefully requested
	button.disable = false;
});

//on Load
selectMediaStream();