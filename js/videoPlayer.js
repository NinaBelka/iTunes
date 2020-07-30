import { addZero } from './supScript.js';

export const videoPlayerInit = () => {

  // Получение элементов со страницы DOM
  const videoPlayer = document.querySelector('.video-player'),
    videoButtonPlay = document.querySelector('.video-button__play'),
    videoButtonStop = document.querySelector('.video-button__stop'),
    videoTimePassed = document.querySelector('.video-time__passed'),
    videoProgress = document.querySelector('.video-progress'),
    videoTimeTotal = document.querySelector('.video-time__total'),
    videoFullscreen = document.querySelector('.video-fullscreen'),
    volumeProgress = document.querySelector('.volume-progress');

  // Реализация паузы
  const toggleIcon = () => {
    if (videoPlayer.paused) {
      videoButtonPlay.classList.remove('fa-pause');
      videoButtonPlay.classList.add('fa-play');
    } else {
      videoButtonPlay.classList.add('fa-pause');
      videoButtonPlay.classList.remove('fa-play');
    }
  };

  const togglePlay = () => {
    if (videoPlayer.paused) {
      videoPlayer.play();
    } else {
      videoPlayer.pause();
    }
  };

  // Реализация стоп-кнопки

  const stopPlay = () => {
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
  };

  videoPlayer.addEventListener('click', togglePlay);

  videoButtonPlay.addEventListener('click', togglePlay);

  videoPlayer.addEventListener('play', toggleIcon);

  videoPlayer.addEventListener('pause', toggleIcon);

  videoButtonStop.addEventListener('click', stopPlay);

  // Реализация отображения времени просмотра
  videoPlayer.addEventListener('timeupdate', () => {
    const currentTime = videoPlayer.currentTime;
    const duration = videoPlayer.duration;

    videoProgress.value = (currentTime / duration) * 100;

    let minutesPassed = Math.floor(currentTime / 60);
    let secondsPassed = Math.floor(currentTime % 60);

    let minutesTotal = Math.floor(duration / 60);
    let secondsTotal = Math.floor(duration % 60);

    videoTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`;
    videoTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;
  });

  // Реализация прогресса воспроизведения
  videoProgress.addEventListener('input', () => {
    const duration = videoPlayer.duration;
    const value = videoProgress.value;
    videoPlayer.currentTime = (value * duration) / 100;
  });

  // Видео на весь экран
  videoFullscreen.addEventListener('click', () => {
    videoPlayer.requestFullscreen();
  });

  // Реализация громкости
  volumeProgress.addEventListener('input', () => {
    videoPlayer.volume = volumeProgress.value / 100;
  });

  videoPlayer.volume = 0.5;
  volumeProgress.value = videoPlayer.volume * 100;

  videoPlayerInit.stop = () => {
    if (!videoPlayer.paused) {
      stopPlay();
    }
  };


};