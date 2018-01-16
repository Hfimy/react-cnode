import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import TopicList from '../view/topicList';
import TopicDetail from '../view/topicDetail';

export default () => [
    <Route key="root" path="/" render={() => <Redirect to="/list" />} exact />,
    <Route key="list" path="/list" component={TopicList} />,
    <Route key="detail" path="/detail" component={TopicDetail} />,
];
