import React from 'react';

import { firebaseConnect } from 'react-redux-firebase';

const Test = props => {
   return <div>Test</div>;
};

export default firebaseConnect(['/flashcards'])(Test);