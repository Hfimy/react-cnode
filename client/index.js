import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';//eslint-disable-line
import App from './App';

const root = document.getElementById('root');
const render = Component => { //eslint-disable-line
    ReactDOM.hydrate(<AppContainer><Component /></AppContainer>, root);
};

render(App);

if (module.hot) {
    module.hot.accept('./App', () => {
        render(App);
    });
}
