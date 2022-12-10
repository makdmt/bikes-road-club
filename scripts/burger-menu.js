const burgerBtn = document.querySelector('.burger-menu__burger');
const burgerMenu = document.querySelector('.burger-menu__menu');
const page = document.querySelector('.page');
const burgerLinks = document.querySelectorAll('.burger-menu__link');

burgerBtn.addEventListener('click', () => {
  burgerBtn.classList.toggle('burger-menu__burger_active');
  burgerMenu.classList.toggle('burger-menu__menu_active');
  page.classList.toggle('page_lock');
})


  const addListener2BurgerLink = (link) => link.addEventListener('click', () => {
  burgerBtn.classList.remove('burger-menu__burger_active');
  burgerMenu.classList.remove('burger-menu__menu_active');
  page.classList.remove('page_lock');
})

burgerLinks.forEach(addListener2BurgerLink);
