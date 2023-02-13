const themeBtns = document.querySelectorAll('.theme-control__switcher');

modifiedClasses = [
  'page',
  'burger-menu__plate',
  'burger-menu__burger',
  'theme-control__switcher',
  'theme-control',
  'theme-control__icon',
  'intro__paragraph',
  'eddi-merks__author-rank',
  'pavements__paragraph',
  'pavements__slider-button',
  'bikes__paragraph',
  'bikes__type-btn',
  'bikes__type-selector-option',
  'trainings__paragraph',
  'mailing',
  'footer'
]

// let elements4Modify = [];

function changeTheme() {
  modifiedClasses.forEach((className) => modifyElementsByClassName(className));
}

function modifyElementsByClassName(className) {
  // console.log(className);
  let elements4Modify = document.querySelectorAll(`.${className}`);
  elements4Modify.forEach(element => element.classList.toggle(`${className}_theme_dark`));
};

const addThemeButtonClickListener = (button) => button.addEventListener('click', changeTheme);
themeBtns.forEach(addThemeButtonClickListener);



