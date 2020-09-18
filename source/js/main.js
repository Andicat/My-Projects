import {polyfills} from './utils/polyfills';
import {ieFooterNailing} from './utils/ie-footer-nailing';

import {initSmoothScrolling} from './modules/scroll';

// Utils
// ---------------------------------

polyfills();
ieFooterNailing();

// Modules
// ---------------------------------

initSmoothScrolling();
