import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class CardSearchForm extends Component {

  state = {
    name: "",
    base_type: "",
    power: "",
    toughness: "",
    color_identity: ""
    // white: false,
    // blue: false,
    // black: false,
    // red: false,
    // green: false,
    // redirect: false
  }

  handleChange = (event) => {
    if (event.target.value) {
      if (event.target.type === "checkbox") {
        this.setState({
          color_identity: this.state.color_identity + event.target.value
        })
      } else {
        this.setState({
          [event.target.id]: event.target.value
        })
      }
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.search(this.state)
    this.setState({
      redirect: true
    })
  }

  render() {
    if (this.state.redirect) {
     return (
     <Redirect to="/cards"/>
     )
   }
    return (
      <div>
        <h3>Card Search:</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group row">
            <label className="col-sm-1 col-form-label">Name</label>
            <div className="col-sm-4">
              <input type="text" className="form-control" id="name" onChange={this.handleChange} value={this.state.name}/>
            </div>
            <label className="col-sm-1 col-form-label">Type</label>
            <div className="col-sm-4">
              <select id="type" className="form-control" onChange={this.handleChange} value={this.state.type}>
                <option value=""></option>
                <option value="Basic Land">Basic Land</option>
                <option value="Land">Land</option>
                <option value="Creature">Creature</option>
                <option value="Instant">Instant</option>
                <option value="Sorcery">Sorcery</option>
                <option value="Artifact">Artifact</option>
                <option value="Enchantment">Enchantment</option>
                <option value="Planeswalker">Planeswalker</option>
                <option value="Artifact Creature">Artifact Creature</option>
              </select>
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-1 col-form-label">Power</label>
            <div className="col-sm-4">
              <input type="number" className="form-control" id="power" onChange={this.handleChange} value={this.state.power}/>
            </div>
            <label className="col-sm-1 col-form-label">Toughness</label>
            <div className="col-sm-4">
              <input type="number" className="form-control" id="toughness" onChange={this.handleChange} value={this.state.toughness}/>
            </div>
          </div>


          <div className="form-group row">
            <label className="col-sm-1">Colors</label>
            <div className="col-sm-5">
              <div className="form-check form-check-inline">
                <label className="form-check-label">White
                  <input className="form-check-input" type="checkbox" id="white" value="W" onChange={this.handleChange}/>
                </label>
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label">Blue
                  <input className="form-check-input" type="checkbox" id="blue" value="U" onChange={this.handleChange}/>
                </label>
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label">Black
                  <input className="form-check-input" type="checkbox" id="black" value="B" onChange={this.handleChange}/>
                </label>
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label">Red
                  <input className="form-check-input" type="checkbox" id="red" value="R" onChange={this.handleChange}/>
                </label>
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label">Green
                  <input className="form-check-input" type="checkbox" id="green" value="G" onChange={this.handleChange}/>
                </label>
              </div>
            </div>
            <div className="col-sm-3">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </div>

        </form>
      </div>
    )
    }
}

export default CardSearchForm
