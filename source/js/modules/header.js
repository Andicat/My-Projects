const header = () => {

  const headerBlock = document.querySelector('.js-header');

  class AuthorizationModal {
    constructor(element) {
      this.element = element;
      this.cityPopupLink = this.element.querySelector('.js-city-link');
      this.cityPopup = this.element.querySelector('.js-city-popup');
      this.cartPopupLink = this.element.querySelector('.js-cart-link');
      this.cartPopup = this.element.querySelector('.js-cart-popup');
      this.searchPopupInput = this.element.querySelector('.js-search-input');
      this.searchPopupLink = this.element.querySelector('.js-search-link');
      this.searchPopup = this.element.querySelector('.js-search-popup');
      this.authorization = this.element.querySelector('.js-authorization');
      this.headerPopup = this.element.querySelector('.header__popup');
      this.headerPopupClose = this.element.querySelector('.header-popup__close');
      this.info = this.element.querySelector('.header__info');
      this.signInBtn = this.element.querySelector('.js-sign-in');
      this.recoveryBtn = this.authorization.querySelector('.js-recovery');
      this.recoveryWrapper = this.authorization.querySelector('.js-recovery-wrapper');
      this.recoveryBtnBack = this.authorization.querySelector('.js-recovery-back');
      this.searchBlock = this.element.querySelector('.header__search-btns');

      this.headerPopup.style.display = 'none';
      this.authorization.style.display = 'none';

      this.setListeners();
    }

    setListeners() {
      this.searchPopupInput.addEventListener('input', () => {
        const clearBtn = this.element.querySelector('.header__search-btn--clear');
        if (this.searchPopupInput.value !== '' && !this.searchBlock.classList.contains('header__search-btns--filled')) {
          this.searchBlock.classList.add('header__search-btns--filled');
          clearBtn.addEventListener('click', this.clearText.bind(this, this.searchPopupInput));
        } else if (this.searchPopupInput.value === '') {
          this.searchBlock.classList.remove('header__search-btns--filled');
        }
      });

      this.searchPopupLink.addEventListener('click', this.openOrderForm.bind(this, this.searchPopup));

      this.cartPopupLink.addEventListener('click', this.openOrderForm.bind(this, this.cartPopup));

      this.cityPopupLink.addEventListener('click', this.openOrderForm.bind(this, this.cityPopup));

      this.signInBtn.addEventListener('click', this.openOrderForm.bind(this, this.authorization));

      this.info.addEventListener('click', this.openOrderForm.bind(this, this.headerPopup));

      this.recoveryBtnBack.addEventListener('click', (event) => {
        event.preventDefault();
        this.recoveryWrapper.style.transform = 'translate3d(0, 0, 0)';
      });

      this.recoveryBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const newPosition = this.recoveryWrapper.offsetWidth;
        this.recoveryWrapper.style.transform = `translate3d(${-newPosition}px, 0, 0)`;
      });
    }

    closeOrderForm(event) {
      const element = event.target;

      if (element.classList.contains('overlay') || event.key === 'Escape' || element.classList.contains('js-close')) {
        this.classList.remove('active');
        document.body.classList.remove('scroll-lock');
        setTimeout(() => {
          this.style.display = 'none';
        }, 300);
      }
    }

    openOrderForm(elem, event) {
      event.preventDefault();
      if (!elem.classList.contains('active')) {
        elem.style.display = 'block';
        document.body.classList.add('scroll-lock');
        setTimeout(() => {
          elem.classList.add('active');
          window.addEventListener('keydown', this.closeOrderForm.bind(elem));
          elem.addEventListener('click', this.closeOrderForm.bind(elem));
        }, 1);
      }
    }

    clearText(elem, event) {
      event.preventDefault();
      elem.value = '';
      this.searchBlock.classList.remove('header__search-btns--filled');
    }
  }

  if (headerBlock) {
    new AuthorizationModal(headerBlock);
  }
};
export {header};
