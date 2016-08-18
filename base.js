window.addEventListener('load',function(){
	video = document.getElementById("video");
	playButton = document.getElementById("play-button");
	progressBarContainer = document.getElementById("progressbar-container");
	progressBar = document.getElementById("progressbar");
	soundButton = document.getElementById("sound-button");
	volumeContainer = document.getElementById("volume-container");
	volumeBar = document.getElementById("volumebar");
	fullScreenButton = document.getElementById("fullscreen-button");
	video.load();
	video.addEventListener('canplay',function(){
		setTotalDuration();
		playButton.addEventListener('click',toggleplay,false);
		progressBarContainer.addEventListener('click',advanceVideo,false);
		soundButton.addEventListener('click',togglevolume,false);
		volumeContainer.addEventListener('click',adjustVolume,false);
		fullScreenButton.addEventListener('click',fullScreen,false);
	},false);
},false);

function toggleplay(){
	if(video.paused){
		video.play();
		playButton.src='images/pause.png';
		update = setInterval(updateProgressBar,30);
		timeupdate = setInterval(setTimePosition,30);
	}
	else{
		video.pause();
		playButton.src='images/play.png';
		window.clearInterval(update);
		window.clearInterval(timeupdate);
	}
}

function updateProgressBar(){
	var percent = (video.currentTime/video.duration)*100;
	progressBar.style.width = percent + '%';
	if(video.ended){
		window.clearInterval(update);
		window.clearInterval(timeupdate);
		playButton.src='images/replay.png';
	}
}

function advanceVideo(event){
	var xaxis  = event.pageX - progressBarContainer.offsetLeft;
	var progresswidth = window.getComputedStyle(progressBarContainer).getPropertyValue('width');
	progresswidth = parseFloat(progresswidth.substr(0, progresswidth.length-2));
	video.currentTime = (xaxis/progresswidth)*video.duration;
	updateProgressBar();
	setTimePosition();
}
function setTotalDuration(){
	var duration = document.getElementById("totaltime");
	var minutes = Math.floor(video.duration / 60);
	var seconds = Math.round(video.duration % 60);
	if(seconds.toString().length ===1) seconds = '0'+seconds;
	var readabledisplay = minutes +":"+ seconds;
	duration.innerHTML = readabledisplay;
}

function setTimePosition(){
	var duration = document.getElementById("current");
	var minutes = Math.floor(video.currentTime / 60);
	var seconds = Math.round(video.currentTime % 60);
	if(seconds.toString().length ===1) seconds = '0'+seconds;
	var readabledisplay = minutes +":"+ seconds;
	duration.innerHTML = readabledisplay;
}

function togglevolume(){
	if(!video.muted){
		video.muted = true;
		soundButton.src='images/mute.png';
		volumeBar.style.display = 'none';
	}
	else{
		video.muted = false;
		soundButton.src='images/sound.png';
		volumeBar.style.display = 'block';
	}
}

function adjustVolume(event){
	var xaxis  = event.pageX - volumeContainer.offsetLeft;
	var width = window.getComputedStyle(volumeContainer).getPropertyValue('width');
	width = parseFloat(width.substr(0, width.length-2));
	video.volume = (xaxis/width);
	volumeBar.style.width = (xaxis/width)*100 +'%';
	video.muted = false;
	soundButton.src='images/sound.png';
	volumeBar.style.display = 'block';
}

function fullScreen(){
	if(window.innerHeight == screen.height){
		if(document.cancelFullScreen) {
        	document.cancelFullScreen();
        } 
        else if(document.mozCancelFullScreen) {
        	document.mozCancelFullScreen();
        } 
        else if(document.webkitCancelFullScreen) {
        	document.webkitCancelFullScreen();
        }
        shrinkVideoContainer();
	}
	else{
		setVideoContainerFull();
		if(player.requestFullScreen){
			player.requestFullScreen();
		} else if(player.webkitRequestFullScreen()){
			player.webkitRequestFullScreen();
		}else if(player.mozRequestFullScreen()){
			player.mozRequestFullScreen();
		}else if(player.msRequestFullscreen()){
			player.msRequestFullScreen();
		}
	}
}

function setVideoContainerFull(){
	videocontainer = document.getElementById("video-container");
	videocontainer.style.width= '90%';
	videocontainer.style.height='auto';
}

function shrinkVideoContainer(){
	videocontainer = document.getElementById("video-container");
	videocontainer.style.width= '640px';
	videocontainer.style.height='360px';
}