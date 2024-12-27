import React from 'react';
import "./CardViewer.css";

import { Link } from 'react-router-dom';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';


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
        console.log('Props in render:', this.props);

        console.log("CARDS HAVE LOADED?: ", isLoaded(this.props.cards));
        console.log("CARDS: ", this.props.cards);

        if (!isLoaded(this.props.cards)) {
            console.log('Cards are still loading...');
            return <div>Loading...</div>;
        }

        if (!this.props.cards || this.props.cards.length === 0) {
            console.log('No cards available:', this.props.cards);
            return <div>No cards available</div>;
        }

        const currentIndex = this.state.currentIndex;
        const totalCards = this.props.cards.length;
        const card = this.props.cards[this.state.currentIndex];

        return (
            <div>
                <h2>{this.props.name}</h2>
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

const mapStateToProps = (state) => {
    console.log('Firebase state:', state.firebase.data);
    const deck = state.firebase.data.deck1; 
    const name = deck && deck.name; 
    const cards = deck && deck.cards; 
    return { name, cards };
};


export default compose(
    firebaseConnect([{ path: '/flashcards/deck1', storeAs: 'deck1' }]),
    connect(mapStateToProps),
)(CardViewer); 