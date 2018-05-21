export const generateSearchParams = (searchTerms, model) => {
  // let params = {}
  // for(let input in searchTerms) {
  //   if (searchTerms[input]) {
  //     // params[`${model}[${input}]`] = searchTerms[input]
  //     params[model] = searchTerms
  //   }
  // }
  let query = Object.keys(searchTerms)
      .map(k => `${model}[${encodeURIComponent(k)}]`  + '=' + encodeURIComponent(searchTerms[k]))
      .join('&');
  return query
}

export const dateFormater = (date) => {
  return new Date(date).toLocaleDateString('en-US')
}

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const sortByName = (a, b) => {
  if (a.name < b.name) {
    return - 1
  } else if (a.name > b.name) {
    return 1
  }
  return 0
}

// export const updateCardFormat = (card, index) => {
//   if (index === parseInt(position, 10)) {
//     card[name] = value
//   }
//   return card
// }
