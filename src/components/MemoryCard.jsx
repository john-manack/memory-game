import React, { Component } from 'react';
import './MemoryCard.css';

class MemoryCard extends Component {
    render() {
        return (
            <div className="MemoryCard" onClick={this.clickHandler()}>
                <div className="MemoryCardInner">
                    <div className="MemoryCardBack">
                        <img src="https://www.digitalcrafts.com/img/digitalcrafts-logo-white-y.png" alt="dc logo"></img>
                    </div>
                    <div className="MemoryCardFront">
                        ∆
                    </div>
                </div>
            </div>
        );
    }

    clickHandler() {
        return () => alert('card clicked');
    }
}

export default MemoryCard;