import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';

import Home from './pages/home';
import Register from './pages/register';
import Info from './pages/info';

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/register" component={Register} />
                <Route path="/info" component={Info} />
            </Switch>
        </BrowserRouter>
    );
}