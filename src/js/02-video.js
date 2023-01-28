import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.getElementById('vimeo-player');
const player = new Vimeo(iframe);
const savedTime = load('videoplayer-current-time');

player.setCurrentTime(savedTime);

player.on('timeupdate', throttle((data) => onPlay(data), 1000));

function onPlay(data) {
  const currentTime = data.seconds;
  save('videoplayer-current-time', currentTime);
};

function save(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (err) {
    console.error(err);
  }
}

function load(key) {
  try {
    const time = localStorage.getItem(key);
    return time === null ? 0.000 : time;
  } catch (err) {
    console.error(err);
  }
}