import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2'

class CurveChart extends Component {
  // calculateCurve = (deck) => {
  //   const curve = Array(10).fill(0)
  //   deck.attributes.cards.reduce((accum, card) => {
  //     return accum[card.cmc - 1] += card.count
  //   }, curve)
  // }

  render() {



    return (
      <Bar>
        data={data}
      </Bar>
    )
  }
}

export default CurveChart
