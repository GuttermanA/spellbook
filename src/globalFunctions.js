import React from 'react'

export const generateSearchParams = (searchTerms, model) => {
  // let params = {}
  // for(let input in searchTerms) {
  //   if (searchTerms[input]) {
  //     // params[`${model}[${input}]`] = searchTerms[input]
  //     params[model] = searchTerms
  //   }
  // }
  let query = Object.keys(searchTerms)
      .map(k => `${model}[${encodeURIComponent(k)}]=${encodeURIComponent(searchTerms[k])}`)
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

export const sortCardsIntoBoards = (cardsArr, Component, sideboard = false, funcs) => {
  return cardsArr.reduce((board, card, index) => {
    if (card.sideboard === sideboard) {
      board.push(<Component index={index} card={card} key={card.key} {...funcs}/>)
    }
    return board
  }, [])
}

export const sortCardsByType = (cardsArr) => {
  return cardsArr.reduce((obj, card)=>{
    if (!Object.keys(obj).includes(card.primary_type)) {
      obj[card.primary_type] = [card]
    } else {
      obj[card.primary_type].push(card)
    }
    return obj
  },{})
}

// export const updateCardFormat = (card, index) => {
//   if (index === parseInt(position, 10)) {
//     card[name] = value
//   }
//   return card
// }
