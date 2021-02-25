import React, { Component } from 'react';
import MemoryCard from './components/MemoryCard';
import './App.css';

const generateDeck = () => {
  const symbols = ['∆', 'ß', '£', '§', '•', '$', '+', 'ø'];
  let deck = [];
  for (let i=0; i < 16; i++) {
    let cardObject = {
      isFlipped: false,
      symbol: symbols[i % 8]
    }
    deck.push(cardObject);
  }
  shuffle(deck);
  return deck;
}

const shuffle = (a) => {
  let j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: generateDeck(),
      pickedCards: []
    };
  }
  
  render() {
    const cardsJSX = this.state.deck.map((card, index) => {
      return (<MemoryCard 
                symbol={card.symbol}
                isFlipped={card.isFlipped}
                key={index}
              />)
    });
    return (
      <div className="App">
        <header className="App-header">
          <h1>Memory Game</h1>
          <h2>Match Cards to Win</h2>
        </header>
        {cardsJSX.slice(0,4)}
        {cardsJSX.slice(4,8)}
        {cardsJSX.slice(8,12)}
        {cardsJSX.slice(12,16)}
      </div>
    );
  }

  pickCard(cardIndex) {
    return () => {
      if (this.state.deck[cardIndex].isFlipped === true) {
        return;
      }
      let cardToFlip = {...this.state.deck[cardIndex]};
      cardToFlip.isFlipped = true;
      let newPickedCards = this.state.pickedCards.concat(cardIndex);
      let newDeck = this.state.deck.map((card, index) => {
        if (cardIndex === index) {
          return cardToFlip;
        }
        return card;
      });
      this.setState({
        deck: newDeck,
        pickedCards: newPickedCards
      });
    }
  }
}

export default App;
