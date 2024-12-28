import React from 'react';
import { Link } from 'react-router-dom';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import './Homepage.css';

class Homepage extends React.Component {
    render() {
        if (!isLoaded(this.props.homepageData)) {
            return <div>Loading...</div>;
        }

        const deckLinks = Object.keys(this.props.homepageData).map((deckID) => {
            const deckName = this.props.homepageData[deckID].name;
            return (
                <li key={deckID}>
                    <Link to={`/viewer/${deckID}`} className='link'>
                        {deckName}
                    </Link>
                </li>
            )
        });

        return (
            <div id="homepage-container">
                <h1 id="title">Welcome to the Flashcard App</h1>
                <div className="link-to-editor">
                    <Link to="/editor" className="link">Create a new deck</Link>
                </div>
                <p id="description">or select from an existing deck below:</p>
                <ul id="deck-list">
                    {deckLinks}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const homepageData = state.firebase.data.homepage;
    return { homepageData };
}

export default compose(
    firebaseConnect([{ path: '/homepage'}]),
    connect(mapStateToProps),
)(Homepage);