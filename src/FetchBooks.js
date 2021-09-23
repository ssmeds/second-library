// export const fetchBooks = () => {
//   fetch('http://localhost:3000/books')
//     .then(res => res.json())
//     .then(data => {
//       console.log('data from fetch', data);
//       return data
//     })
// }

const URL = 'https://stinas-svelte-library.herokuapp.com/books'

import { writable } from "svelte/store";

export function updateList(books) {
  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      books = data
      return books;
    });
}

export const deleteBook = (id) => {
  console.log('delete id', id);
  fetch(`${URL}/${id}`, {
    method: 'delete'
  })
    .then(res => res.json())
    .then(data => {
      console.log('data from delete', data);
    })
}

export default function (url) {

  const loading = writable(false)
  const error = writable(false)
  const data = writable({})

  async function get() {
    loading.set(true)
    error.set(false)
    try {
      const response = await fetch(url)
      data.set(await response.json())
    } catch (error) {
      error.set(error)
    }
    loading.set(false)
  }
  get()
  return [data, loading, error, get]
}