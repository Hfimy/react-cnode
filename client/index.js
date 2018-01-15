import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';//eslint-disable-line
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';

import App from './route';
import appState from './store/appState';

const root = document.getElementById('root');
const render = Component => { //eslint-disable-line
    ReactDOM.render(
        <AppContainer>
            <Provider appState={appState}>
                <BrowserRouter>
                    <Component />
                </BrowserRouter>
            </Provider>
        </AppContainer>,
        root,
    );
};

render(App);

if (module.hot) {
    module.hot.accept('./route', () => {
        render(App);
    });
}
