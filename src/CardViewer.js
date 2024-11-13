import React from 'react';
import "./CardViewer.css";
import { Link } from 'react-router-dom';

class CardViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0,
            showFront: true,
        };
    }

    toggleSide = () => this.setState({ showFront: !this.state.showFront });

    switchCard = (event) => {
        if (event.target.id === "forward") {
            this.setState({ currentIndex: this.state.currentIndex + 1 });
        } else {
            this.setState({ currentIndex: this.state.currentIndex - 1 });
        };
        this.state.showFront = true;
    }

    render() {
        const currentIndex = this.state.currentIndex;
        const totalCards = this.props.cards.length;
        const card = this.props.cards[this.state.currentIndex];

        return (
            <div>
                <h2>Card Viewer</h2>
                <div id="card" onClick={this.toggleSide}>
                    {this.state.showFront ? card.front : card.back}
                </div>
                <div id="card-nav">
                    <button className="arrow" id="backward" disabled={ currentIndex === 0} onClick={this.switchCard}> &lt; </button>
                    <p> {currentIndex + 1} / {totalCards} </p>
                    <button className="arrow" id="forward" disabled={ currentIndex === totalCards - 1 } onClick={this.switchCard}> &gt; </button>
                </div>
                
                <hr />
                <Link to="/editor">Go to card editor</Link>
            </div>
        );
    }
}

export default CardViewer;