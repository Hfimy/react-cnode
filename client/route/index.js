import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import TopicList from '../view/topicList';
import TopicDetail from '../view/topicDetail';

export default () => [
    <Route path="/" render={() => <Redirect to="/list" />} exact />,
    <Route path="/list" component={TopicList} />,
    <Route path="/detail" component={TopicDetail} />,
];
