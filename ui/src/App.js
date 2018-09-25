import React from 'react';

import { Switch, Route } from 'react-router-dom'
import HomeScreen from "./screens/HomeScreen";
import Header from "./components/Header";

class App extends React.Component {
    render() {
        return (
            <main>
                <Header/>
                <Switch>
                    <Route exact path='/' component={HomeScreen}/>
                </Switch>
            </main>
        )
    }
}

export default App;
