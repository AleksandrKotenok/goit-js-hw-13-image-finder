
const BASE_URL = 'https://pixabay.com/api/'
const API_KEY = '24019478-a45fd8183fcedd4cf851bb538'
const imageType = 'photo'
const orientation = 'horizontal'
const perPage = 12
export default class APIpixabay {
  constructor() {
    this.search = ''
    this.page = 1
  }
  fetchApiFirst() {
   const url = `${BASE_URL}?image_type=${imageType}&orientation=${orientation}&q=${this.search}&page=${this.page}&per_page=${perPage}&key=${API_KEY}`
     return fetch(url).then(response =>response.json())
 }
  fetchApi() {
    const url = `${BASE_URL}?image_type=${imageType}&orientation=${orientation}&q=${this.search}&page=${this.page}&per_page=${perPage}&key=${API_KEY}`
    return fetch(url).then(response => {
      this.nextPage();
      return response.json();
    })
  }

   nextPage() {
      this.page += 1
   }
  get q() {
    return this.search
  }

  set q(newQuery) {
    this.search = newQuery
  }
}