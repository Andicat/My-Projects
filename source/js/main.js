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

// Tasks
// ---------------------------------
import './modules/modal';
import './modules/chess';
import './modules/chess-knight';
import './modules/elevator';