import React from 'react';
import "./CardEditor.css";
import { Link, withRouter } from 'react-router-dom';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';

class CardEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            cards: [
                { front: 'front1', back: 'back1' },
                { front: 'front2', back: 'back2' },
              ],
            front: '',
            back: '',
            name: '',
        };
    }

    addCard = () => {
        if (!this.state.front.trim() || !this.state.back.trim()) {
            alert('Please enter both a front and a back for the card.');
            return;
        } 
                
        const newCard = { front: this.state.front, back: this.state.back };
        const cards = this.state.cards.slice().concat(newCard);
        this.setState({ cards, front: '', back: ''});
    };

    deleteCard = index => {
        const cards = this.state.cards.slice();
        cards.splice(index, 1);
        this.setState({ cards: cards });
    };

    handleChange = event =>
        this.setState({ [event.target.name]: event.target.value });

    createDeck = () => {
        const deckID = this.props.firebase.push('/flashcards').key;
        const updates = {};
        const newDeck = { name: this.state.name, cards: this.state.cards };
        updates[`/flashcards/${deckID}`] = newDeck;
        updates[`/homepage/${deckID}`] = { name: this.state.name };
        const onComplete = () => {
            console.log('Datatbase Updated');
            this.props.history.push(`/viewer/${deckID}`);
        }
        this.props.firebase.update('/', updates, onComplete);
    }

    render() {
        const cards = this.state.cards.map((card, index) => {
            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{card.front}</td>
                    <td>{card.back}</td>
                    <td>
                        <button className="delete-button" 
                        onClick={() => this.deleteCard(index)}>Delete</button>
                    </td>
                </tr>
            )
        })
        return (
            <div id="card-editor-container">
                <h2>Card Editor</h2>

                <input
                    name="name"
                    onChange={this.handleChange}
                    placeholder="Deck Name"
                    value={this.state.name}
                />

                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Front</th>
                            <th>Back</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>{cards}</tbody>
                </table>

                <br/>
                <input 
                    name="front"
                    onChange={this.handleChange} 
                    placeholder="Front of card" 
                    value={this.state.front} />
                <input 
                    name="back"
                    onChange={this.handleChange} 
                    placeholder="Back of card" 
                    value={this.state.back} />
                <button id="add-card-btn" onClick={this.addCard} >Add Card</button>

                <br />
                <button
                    disabled={!this.state.name.trim() || this.state.cards.length === 0}
                    onClick={this.createDeck}
                >
                    Create Deck
                </button>

                <hr />
                <Link to="/">Go Home</Link>
            </div>
        );
    }
}

export default compose(firebaseConnect(), withRouter)(CardEditor);