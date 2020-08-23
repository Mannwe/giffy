const apiKey = 'XXNg4ajR3uN9b5H2HzJZT5o8GVbk2LNt'

export const getGifs = ({keyword = 'morty'} = {} ) => {
  const apiURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${keyword}&limit=25&offset=0&rating=g&lang=en`

  return fetch(apiURL)
    .then(res => res.json())
    .then(response => {
      const { data } = response
      const gifs = data.map(image => {
          const { title, id } = image
          const { url } = image.images.downsized_medium

          return { title, id, url }
      })

      return gifs
    })
}