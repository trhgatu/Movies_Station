window.addEventListener('scroll', event => {
    const headerScroll = document.querySelector('.header')
    if (window.scrollY > 0) {
        headerScroll.classList.add('header--scrolled')
    } else {
        headerScroll.classList.remove('header--scrolled')
    }
})





var searchBtn = document.querySelector(".header__navbar-item-btn-search");
var searchInput = document.querySelector(".header__navbar-item-input");

searchBtn.addEventListener('click', () => {
    if (searchInput.classList.contains('header__navbar-item-input--slice')) {
        searchInput.classList.remove('header__navbar-item-input--slice');
        searchInput.addEventListener('transitionend', function handler() {
            searchInput.style.display = "none";
            searchInput.removeEventListener('transitionend', handler);
        });
    } else {
        searchInput.style.display = "block";
        setTimeout(() => {
            searchInput.classList.add('header__navbar-item-input--slice');
        }, 1);
    }
});

document.addEventListener('click', (event) => {
    const isClickedInside = searchBtn.contains(event.target) || searchInput.contains(event.target);
    if (!isClickedInside) {
        searchInput.classList.remove('header__navbar-item-input--slice');
    }
});

