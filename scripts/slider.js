const pavementsNextBtn = document.querySelector('.pavements__slider-button_direction_next');
const pavementsPrevBtn = document.querySelector('.pavements__slider-button_direction_previous');
const pavementSliderContainer = document.querySelector('.pavements__slider-container');
const pavementCards = document.querySelectorAll('.pavements__card');
const pavementIndicators = document.querySelectorAll('.pavements__indicator-chart')
const bikesSliderContainers = document.querySelectorAll('.bikes__slider-container')
const bikesTypeBtns = document.querySelectorAll('.bikes__type-btn')
const bikesTypeSelector = document.querySelector('.bikes__type-selector')
const bikesSliderBtn = document.querySelectorAll('.bikes__slider-btn')

let activeCardIndex = 0;

// console.log(window.innerWidth);

pavementsNextBtn.addEventListener('click', () => {
  let previosCardIndex = activeCardIndex;
  activeCardIndex += 1;
  activeCardIndex = checkCardIndex(activeCardIndex, pavementSliderContainer);
  moveContainer(pavementSliderContainer, activeCardIndex);
  activateBikesContainer(activeCardIndex, previosCardIndex);
})


pavementsPrevBtn.addEventListener('click', () => {
  let previosCardIndex = activeCardIndex;
  activeCardIndex -= 1;
  activeCardIndex = checkCardIndex(activeCardIndex, pavementSliderContainer);
  moveContainer(pavementSliderContainer, activeCardIndex);
  activateBikesContainer(activeCardIndex, previosCardIndex);
})

let currentBikeType = bikesTypeSelector.selectedIndex;

bikesTypeSelector.addEventListener('change', () => {
  activateBikesContainer(bikesTypeSelector.selectedIndex, currentBikeType);
  currentBikeType = bikesTypeSelector.selectedIndex;
})


const addTypeButtonClickListener = (button, index) => button.addEventListener('click', () => {
  console.log(bikesTypeBtns[index]);
  activateBikesContainer(index, currentBikeType);
  currentBikeType = index;
})

bikesTypeBtns.forEach(addTypeButtonClickListener);

const addButtonClickListener = (button) => button.addEventListener('click', ({ target }) => changeBikeCard(target.dataset.direction));
bikesSliderBtn.forEach(addButtonClickListener);

let activeBikeCardIndex = 0;
function changeBikeCard(direction) {
  const activeBikesContainer = document.querySelector('.bikes__slider-container_active');
  const numberOfCards = activeBikesContainer.length;
  let prevActiveBikeCardIndex = activeBikeCardIndex;

  activeBikeCardIndex += direction === 'next' ? 1 : -1;
  activeBikeCardIndex = checkCardIndex(activeBikeCardIndex, activeBikesContainer);
  // console.log(activeBikesContainer.firstElementChild.offsetWidth);
  // console.log(activeBikeCardIndex);
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
  // slider.style.transform = `translateX(${-(window.innerWidth* 0.027 + slider.firstElementChild.offsetWidth)*newCardIndex}px)`;
  // slider.style.transform = `translateX(${-(slider.style.offsetWidth/slider.children.length)*newCardIndex}px)`;

}

function checkCardIndex(cardIndex, slider) {
  if (cardIndex < 0) return slider.children.length - 1;
  if (cardIndex === slider.children.length) return 0;
  return cardIndex;
}

function activateBikesContainer(newActivIndex, prevActivIndex) {
  activeBikeCardIndex = 0;
  // bikesSliderContainers[prevActivIndex].removeAttribute("style");
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

  // bikesSliderContainers[prevActivIndex].classList.remove('bikes__slider-container_active');
  bikesSliderContainers.forEach(element => {
    element.classList.remove('bikes__slider-container_active');
  })
  bikesSliderContainers[newActivIndex].classList.add('bikes__slider-container_active');
  bikesTypeBtns[prevActivIndex].classList.remove('bikes__type-btn_active');
  bikesTypeBtns[newActivIndex].classList.add('bikes__type-btn_active');
  bikesTypeSelector.selectedIndex = newActivIndex;
}
