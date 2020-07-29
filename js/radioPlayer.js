export const radioPlayerInit = () => {
  console.log('Radio Init');

  const radio = document.querySelector('.radio'),
    radioHeaderBig = document.querySelector('.radio-header__big'),
    radioCoverImg = document.querySelector('.radio-cover__img'),
    radioNavigation = document.querySelector('.radio-navigation'),
    radioItem = document.querySelectorAll('.radio-item'),
    radioStop = document.querySelector('.radio-stop'),
    radioVolume = document.querySelector('.radio-volume');

  const audio = new Audio();
  audio.type = 'audio/aac';

  radioStop.disabled = true;

  // Смена кнопок stop/play
  const changeIconPlay = () => {
    if (audio.paused) {
      radio.classList.remove('play');
      radioStop.classList.add('fa-play');
      radioStop.classList.remove('fa-stop');
    } else {
      radio.classList.add('play');
      radioStop.classList.add('fa-stop');
      radioStop.classList.remove('fa-play');
    }
  };

  const selectItem = elem => {
    radioItem.forEach(item => item.classList.remove('select'));
    elem.classList.add('select');
  };

  // Включение радиостанций
  radioNavigation.addEventListener('change', event => {
    const target = event.target;
    const parent = target.closest('.radio-item');
    selectItem(parent);

    // Смена названия радиостанций
    const title = parent.querySelector('.radio-name').textContent;

    radioHeaderBig.textContent = title;

    // Смена лейбла радиостанций
    const urlImg = parent.querySelector('.radio-img').src;
    radioCoverImg.src = urlImg;

    radioStop.disabled = false;
    audio.src = target.dataset.radioStation;
    audio.play();
    changeIconPlay();
  });

  // Реализация паузы
  radioStop.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
    changeIconPlay();
  });

  // Реализация громкости
  radioVolume.addEventListener('input', () => {
    audio.volume = radioVolume.value / 100;
  });

  audio.volume = 0.5;
  radioVolume.value = audio.volume * 100;

};