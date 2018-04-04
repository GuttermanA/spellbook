export const generateSearchParams = (searchTerms) => {
  let params = {}
  for(let input in searchTerms) {
    if (searchTerms[input]) {
      params[`card[${input}]`] = searchTerms[input]
    }
  }
  let esc = encodeURIComponent;
  let query = Object.keys(params)
      .map(k => esc(k) + '=' + esc(params[k]))
      .join('&');
  return query
}
