import {polyfills} from './utils/polyfills';
import {ieFooterNailing} from './utils/ie-footer-nailing';

import {initModals} from './modules/init-modals';
import {header} from './modules/header';

import {initSmoothScrolling} from './modules/scroll';

// Utils
// ---------------------------------

polyfills();
ieFooterNailing();

// Modules
// ---------------------------------

initModals();
header();
initSmoothScrolling();
