import React, { Component } from 'react';
import './MemoryCard.css';

class MemoryCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFlipped: false
        };
    }
    
    render() {
        let memoryCardInnerClass = this.state.isFlipped ? "MemoryCardInner flipped" : "MemoryCardInner";
        return (
            <div className="MemoryCard" onClick={this.clickHandler()}>
                <div className={memoryCardInnerClass}>
                    <div className="MemoryCardBack">
                        <img src="https://www.digitalcrafts.com/img/digitalcrafts-logo-white-y.png" alt="dc logo"></img>
                    </div>
                    <div className="MemoryCardFront">∆</div>
                </div>
            </div>
        );
    }

    clickHandler() {
        return () => this.setState({
            isFlipped: !this.state.isFlipped
        });
    }
}

export default MemoryCard;