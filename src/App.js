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
  
  unflipCards(card1Index, card2Index) {
    let card1 = {...this.state.deck[card1Index]};
    let card2 = {...this.state.deck[card2Index]};
    card1.isFlipped = false;
    card2.isFlipped = false;
    let newDeck = this.state.deck.map((card, index) => {
      if (index === card1Index) {
        return card1;
      } if (index === card2Index) {
        return card2;
      } 
      return card;
    });
    this.setState({
      deck: newDeck
    })
  }

  render() {
    const cardsJSX = this.state.deck.map((card, index) => {
      return (<MemoryCard 
                symbol={card.symbol}
                isFlipped={card.isFlipped}
                key={index}
                pickCard={this.pickCard(index)}
              />)
    });
    return (
      <div className="App">
        <header className="App-header">
          <h1>Memory Game</h1>
          <h2>Match Cards to Win</h2>
        </header>
        <div>
          {cardsJSX.slice(0,4)}
        </div>
        <div>
          {cardsJSX.slice(4,8)}
        </div>
        <div>
          {cardsJSX.slice(8,12)}
        </div>
        <div>
          {cardsJSX.slice(12,16)}
        </div>
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
      if (newPickedCards.length === 2) {
        const card1Index = newPickedCards[0];
        const card2Index = newPickedCards[1];
        if (newDeck[card1Index].symbol !== newDeck[card2Index].symbol) {
          setTimeout(this.unflipCards.bind(this, card1Index, card2Index), 1000);
        }
        newPickedCards = [];
      }
      this.setState({
        deck: newDeck,
        pickedCards: newPickedCards
      });
    }
  }
}

export default App;
