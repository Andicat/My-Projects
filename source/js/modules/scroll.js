const anchorList = document.querySelectorAll('.nav__item');

const initSmoothScrolling = () => {
  anchorList.forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const blockID = e.target.getAttribute('href').substr(1);
      window.scrollTo({
        top: document.getElementById(blockID).offsetTop,
        left: 0,
        behavior: 'smooth',
      });
    });
  });
};

export {initSmoothScrolling};
