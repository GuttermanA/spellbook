# Spellbook: A Card, Deck, and Collection React Web Application for Magic the Gathering

This is a React web application built alongside and for use with the API found [here](https://github.com/GuttermanA/spellbook-api). The genesis of this project was to build a better deck and collection manager for Magic: The Gathering. Many of the most popular websites are sluggish and out of date, so I thought I would attempt make modern deck builder using React.

Features include:
* Login with authentication
* View their saved decks and card collection
* View other user's decks
* Perform full CRUD action on their decks and collection
* Search a database of nearly 20,000 Magic cards
* Search for user decks
* Build deck or add to collection from card search results page
* Build deck or add to collection from collection page
* Copy existing user decks to your account
* Edit in place from deck show page

#### Demo

<a href="http://www.youtube.com/watch?feature=player_embedded&v=KreN1TQNLKM
" target="_blank"><img src="http://img.youtube.com/vi/KreN1TQNLKM/0.jpg" 
alt="IMAGE ALT TEXT HERE" width="240" height="180" border="10" /></a>

## Installing
1. Setup Rails API found [here](https://github.com/GuttermanA/spellbook-api). Ensure server is running on port 3000.
2. Clone repository from GitHub
3. Navigate to the repository directory
```
cd spellbook-api
```
4. Install packages
**NOTE:** Ensure you use npm to ensure that Semantic UI installs correctly.
```
npm install
```
5. Start server
```
npm start
```
Configured to always start on port 3001

## Built With
* [React](http://rubyonrails.org/) - web-application framework
* [Redux](https://redux.js.org/) - state container
* [Redux-Thunk](https://github.com/reduxjs/redux-thunk) - middleware
* [React Router Dom](https://reacttraining.com/react-router/) - routing
* [Semantic UI for React](https://react.semantic-ui.com) - styling

## Contributing
1. Fork repository [here](https://github.com/GuttermanA/spellbook)
2. Create new branch for your feature
```
git checkout -b my-new-feature
```
3. Add and commit your changes
```
git commit -am 'Add some feature'
```
4. Push to your branch
```
git push origin my-new-feature
```
5. Create new pull request

## Authors
* Alexander Gutterman - [Github](https://github.com/guttermana)

## License

MIT © 2018 Alexander Gutterman

The information presented in this website about Magic: The Gathering, both literal and graphical, is copyrighted by Wizards of the Coast. This website is not produced, endorsed, supported, or affiliated with Wizards of the Coast.
