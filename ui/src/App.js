import React from 'react';

import { Switch, Route } from 'react-router-dom'
import HomeScreen from "./screens/HomeScreen";
import Header from "./components/header/Header";

class App extends React.Component {
    render() {
        return (
            <main>
                
                <Switch>
                    <Route exact path='/' component={HomeScreen}/>
                </Switch>
            </main>
        )
    }
}

export default App;
