//npm's
import debounce from 'lodash.debounce'
import { alert, notice, info, success, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
//api
import APIpixabay from './apiService.js'
const API = new APIpixabay()
import picture from '../templates/listPictures.hbs'

import MyNotification from './notification.js'
const notification = new MyNotification()
//elements
const search = document.querySelector('.search-form')
const more = document.querySelector('.more')
const insertPoint = document.querySelector('.gallery')
//listeners
search.addEventListener('input', debounce(searchImg, 1000))
more.addEventListener('click', loadMore)
more.style.display = 'none'

function searchImg(event) {
   API.q = event.target.value
   
   insertPoint.innerHTML = ''
   if (API.q !== '') { // перевірка на пустий запит
      console.log(`текст запиту = `,event.target.value,`. Пошук з сторінки №`, API.page)
      API.page = 1
      createMarkup()
   }
   else {   
      more.style.display = 'none'
      insertPoint.innerHTML = ''
      noValue()
   }
}
function createMarkup() {
   API.fetchApiFirst()
      .then(hits => {console.log(`результатів = `,hits.totalHits, `сторінка № `,API.page)
         return hits})
      .then(hits => {
         insertPoint.insertAdjacentHTML('beforeend',picture(hits))
         more.style.display = 'flex'
         console.log(`згенеровано`, insertPoint.children.length)
         //перевірка завантаження всії об'єктів
         if (insertPoint.children.length == hits.totalHits) { 
            console.log(`завантажено всі`, insertPoint.children.length, `об'єкти з знайдених=`, hits.totalHits)
            more.style.display = 'none'
            noMore()
         }
      })
      .catch(error => {
         console.log(error)
         err()
      })
}
function loadMore() {
   API.fetchApi().then(createMarkup).then(scroll)
}
function scroll() {
   setTimeout(() => {more.scrollIntoView({behavior: 'smooth',block: 'end'})}, 1000)
}

function noValue() {
   notice ({
   text: 'Введіть текст для пошуку!',
   type: 'notice',
   styling: 'brighttheme',
   maxTextHeight: null,
   closerHover: true,
   animation: 'fade',
   delay: 2000,
   hide: true
})
}

function err() {
error({
   text: 'Помилка',
   type: 'error',
   styling: 'brighttheme',
   maxTextHeight: null,
   closerHover: true,
   animation: 'fade',
   delay: 2000,
   hide: true
})
}

function noMore() {
   error({
   text: 'За вашим запитом данні відсутні або відображені всі зображення',
   type: 'error',
   styling: 'brighttheme',
   maxTextHeight: null,
   closerHover: true,
   animation: 'fade',
   delay: 2000,
   hide: true
})
}
