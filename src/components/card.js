import React from 'react'

const Card = (props) => {
  const {
      id,
      name,
      cmc,
      mana_cost,
      color_identity,
      base_type,
      rarity,
      power,
      toughness,
      text,
      img_url,
      game_format
  } = props.card
  return (
    <div className="card ovf-hidden">
        <div className="view overlay hm-white-slight">
            <img src={img_url} className="img-fluid" alt={name}/>
            <a>
                <div className="mask waves-effect waves-light"></div>
            </a>
        </div>
        <div className="card-body">
            <a className="activator"><i className="fa fa-share-alt"></i></a>
            <hr/>
            <a className="link-text"><h5>Flip<i className="fa fa-chevron-right"></i></h5></a>
        </div>
        <div className="card-reveal">
            <div className="content text-center">
                <h4 className="card-title">Social shares <i className="fa fa-close"></i></h4>
                <hr/>
                <ul className="inline-ul">
                    <li><a className="btn-floating btn-small btn-fb"><i className="fa fa-facebook"> </i></a></li>
                    <li><a className="btn-floating btn-small btn-tw"><i className="fa fa-twitter"> </i></a></li>
                    <li><a className="btn-floating btn-small btn-gplus"><i className="fa fa-google-plus"> </i></a></li>
                    <li><a className="btn-floating btn-small btn-li"><i className="fa fa-linkedin"> </i></a></li>
                    <li><a className="btn-floating btn-small btn-git"><i className="fa fa-github"> </i></a></li>
                    <li><a className="btn-floating btn-small btn-pin"><i className="fa fa-pinterest"> </i></a></li>
                    <li><a className="btn-floating btn-small btn-ins"><i className="fa fa-instagram"> </i></a></li>
                </ul>
                <h5>Join our community</h5>
                <hr/>
                <ul className="inline-ul">
                    <li><a className="btn btn-fb"><i className="fa fa-facebook"> </i></a></li>
                    <li><a className="btn btn-tw"><i className="fa fa-twitter"> </i></a></li>
                    <li><a className="btn btn-li"><i className="fa fa-linkedin"> </i></a></li>
                    <li><a className="btn btn-ins"><i className="fa fa-instagram"> </i></a></li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Card
