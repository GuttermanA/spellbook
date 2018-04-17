export const generateSearchParams = (searchTerms, model) => {
  let params = {}
  for(let input in searchTerms) {
    if (searchTerms[input]) {
      params[`${model}[${input}]`] = searchTerms[input]
    }
  }
  let esc = encodeURIComponent;
  let query = Object.keys(params)
      .map(k => esc(k) + '=' + esc(params[k]))
      .join('&');
  return query
}

export const dateFormater = (date) => {
  return new Date(date).toLocaleDateString('en-US')
}

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// export const updateCardFormat = (card, index) => {
//   if (index === parseInt(position, 10)) {
//     card[name] = value
//   }
//   return card
// }
