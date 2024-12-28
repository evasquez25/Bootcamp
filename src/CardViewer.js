import React from 'react';
import "./CardViewer.css";

import { Link, withRouter } from 'react-router-dom';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
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
        if (!isLoaded(this.props.cards)) {
            console.log('Cards are still loading...');
            return <div>Loading...</div>;
        }
        console.log("CARDS HAVE LOADED?: ", isLoaded(this.props.cards));

        if (isEmpty(this.props.cards)) {
            console.log('No cards found...');
            return <div>No cards found...</div>;
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
                <Link to="/">Go Home</Link>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    console.log('Firebase state:', state.firebase.data);
    const deck = state.firebase.data[props.match.params.deckID]; 
    const name = deck && deck.name; 
    const cards = deck && deck.cards; 
    return { name, cards };
};


export default compose(
    withRouter,
    firebaseConnect(props => {
        const deckID = props.match.params.deckID;
        return [{ path: `/flashcards/${deckID}`, storeAs: deckID }];
    }),
    connect(mapStateToProps),
)(CardViewer); 