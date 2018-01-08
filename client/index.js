/* eslint-disable*/
import React, { Component } from 'react';//eslint-disable-line
import ReactDOM from 'react-dom';
import App from './App';//eslint-disable-line
import { AppContainer } from 'react-hot-loader';


const root = document.getElementById('root');
const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        root
    );
};

render(App);

if (module.hot) {
    module.hot.accept('./App', () => {
        render(App);
    });
}
