import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

import { AppState } from '../../store/appState';
// 注入  观察者
@inject('appState') @observer
export default class TopicList extends Component {
    static propTypes = {
        // 原生js里是instanceof
        appState: PropTypes.instanceOf(AppState).isRequired,
    }

    changeName = (e) => {
        this.props.appState.changeName(e.target.value);
    }
    render() {
        return (
            <div>
                <input onChange={this.changeName} />
                <span>
                    {this.props.appState.msg}
                </span>
            </div>
        );
    }
}
