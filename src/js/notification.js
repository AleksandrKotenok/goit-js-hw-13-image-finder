import { alert, notice, info, success, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

export default class MyNotification{
  constructor() { }
  
  myInfo() {
    info({
      text: 'Please enter the value!',
      type: 'info',
      styling: 'brighttheme',
      maxTextHeight: null,
      closerHover: true,
      animation: 'fade',
      delay: 2000,
      hide: true,
    });
  }

  myError() {
    error({
      text: 'Something wrong! Try again',
      type: 'info',
      styling: 'brighttheme',
      maxTextHeight: null,
      closerHover: true,
      animation: 'fade',
      delay: 2000,
      hide: true,
    });
  }

  myNotice() {
      notice({
      text: 'Not found!',
      type: 'info',
      styling: 'brighttheme',
      maxTextHeight: null,
      closerHover: true,
      animation: 'fade',
      delay: 2000,
      hide: true,
    });
  }
}