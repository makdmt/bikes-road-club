const pavementsNextBtn = document.querySelector('.pavements__slider-button_direction_next');
const pavementsPrevBtn = document.querySelector('.pavements__slider-button_direction_previous');
const pavementSliderContainer = document.querySelector('.pavements__slider-container');
const pavementCards = document.querySelectorAll('.pavements__card');
const pavementIndicators = document.querySelectorAll('.pavements__indicator-chart')
const pavementSliderWindow = document.querySelector('.pavements__slider-window');

const bikesSliderContainers = document.querySelectorAll('.bikes__slider-container')
const bikesTypeBtns = document.querySelectorAll('.bikes__type-btn')
const bikesTypeSelector = document.querySelector('.bikes__type-selector')
const bikesSliderBtn = document.querySelectorAll('.bikes__slider-btn')
const bikesSliderWindow = document.querySelector('.bikes__slider-window');

let activePavementCardIndex = 0;
let activeBikeTypeIndex = bikesTypeSelector.selectedIndex;
let activeBikeCardIndex = 0;

const touchCoordinates = {
  touchXStart: -1,
  touchXEnd: -1,
  touchYStart: -1,
  touchYEnd: -1,
}


//Обработчики для слайдера Pavements
pavementsNextBtn.addEventListener('click', changePavement('next'));
pavementsPrevBtn.addEventListener('click', changePavement('prev'));
addTouchStartSliderListener(pavementSliderWindow)
addTouchEndSliderListener(pavementSliderWindow, changePavement('next'), changePavement('prev'))


//Обработчики для cлайдера с типами велосипедов
bikesTypeSelector.addEventListener('change', () => {
  changeBikesContainer(bikesTypeSelector.selectedIndex, activeBikeTypeIndex);
  activeBikeTypeIndex = bikesTypeSelector.selectedIndex;
})

bikesTypeBtns.forEach((button, index) => {
  button.addEventListener('click', () => {
    changeBikesContainer(index, activeBikeTypeIndex);
    activeBikeTypeIndex = index;
  })
})


//Обработчики для cлайдера с карточками велосипедов (виден только на мобильной верстке)
bikesSliderBtn.forEach(button => {
  button.addEventListener('click', (evt) => {
    changeBikeCard(evt.target.dataset.direction)
  })
})
addTouchStartSliderListener(bikesSliderWindow)
addTouchEndSliderListener(bikesSliderWindow, () => changeBikeCard('next'), () => changeBikeCard('prev'))


//Вспомогательные функции
function addTouchStartSliderListener(sliderWindow) {
  sliderWindow.addEventListener('touchstart', evt => {
    if (window.innerWidth <= 550) {
      touchCoordinates.touchXStart = evt.targetTouches[0].screenX;
      touchCoordinates.touchYStart = evt.targetTouches[0].screenY;
    }
  })
}

function addTouchEndSliderListener(sliderWindow, goNextFunc, goPrevFunc) {
  sliderWindow.addEventListener('touchend', evt => {
    if (window.innerWidth <= 550) {
      touchCoordinates.touchXEnd = evt.changedTouches[0].screenX;
      touchCoordinates.touchYEnd = evt.changedTouches[0].screenY;
      if (Math.abs(touchCoordinates.touchYEnd - touchCoordinates.touchYEnd) < 100) {
        touchCoordinates.touchXStart - touchCoordinates.touchXEnd > 20 && goNextFunc();
        touchCoordinates.touchXStart - touchCoordinates.touchXEnd < -20 && goPrevFunc();
        touchCoordinates.touchXStart = -1;
        touchCoordinates.touchXEnd = -1;
        touchCoordinates.touchYStart = -1;
        touchCoordinates.touchYEnd = -1;
      }
    }
  })
}


function changePavement(direction) {
  const cardIndexChander = direction === 'next' ? 1 : -1
  return function () {
    let previosCardIndex = activePavementCardIndex;
    activePavementCardIndex += cardIndexChander;
    activePavementCardIndex = checkCardIndex(activePavementCardIndex, pavementSliderContainer);
    moveContainer(pavementSliderContainer, activePavementCardIndex);
    changeBikesContainer(activePavementCardIndex, previosCardIndex);
  }
}

function changeBikesContainer(newActivIndex, prevActivIndex) {
  activeBikeCardIndex = 0;
  bikesSliderContainers.forEach(element => {
    element.removeAttribute("style");
  })

  bikesSliderBtn.forEach(function (button, index) {
    button.classList.remove('bikes__slider-btn_active');
    button.dataset.direction = 'next';
    if (index === 0) {
      button.classList.add('bikes__slider-btn_active');
      button.dataset.direction = 'previous';
    }
  })

  bikesSliderContainers.forEach(element => {
    element.classList.remove('bikes__slider-container_active');
  })
  bikesSliderContainers[newActivIndex].classList.add('bikes__slider-container_active');
  bikesTypeBtns[prevActivIndex].classList.remove('bikes__type-btn_active');
  bikesTypeBtns[newActivIndex].classList.add('bikes__type-btn_active');
  bikesTypeSelector.selectedIndex = newActivIndex;
}

function changeBikeCard(direction) {
  const activeBikesContainer = document.querySelector('.bikes__slider-container_active');
  let prevActiveBikeCardIndex = activeBikeCardIndex;

  activeBikeCardIndex += direction === 'next' ? 1 : -1;
  activeBikeCardIndex = checkCardIndex(activeBikeCardIndex, activeBikesContainer);
  activeBikesContainer.style.transform = `translateX(${-(activeBikesContainer.offsetWidth * 1.445 + (30 + activeBikesContainer.firstElementChild.offsetWidth) * activeBikeCardIndex)}px)`;
  bikesSliderBtn[prevActiveBikeCardIndex].classList.remove('bikes__slider-btn_active');
  bikesSliderBtn[activeBikeCardIndex].classList.add('bikes__slider-btn_active');
  bikesSliderBtn.forEach(function (button, index) {
    if (index < activeBikeCardIndex) button.dataset.direction = 'previous';
    if (index > activeBikeCardIndex) button.dataset.direction = 'next';

  })
}


function moveContainer(slider, newCardIndex) {
  slider.style.transform = `translateX(${-(50 + slider.firstElementChild.offsetWidth) * newCardIndex}px)`;
}

function checkCardIndex(cardIndex, slider) {
  if (cardIndex < 0) return slider.children.length - 1;
  if (cardIndex === slider.children.length) return 0;
  return cardIndex;
}
