import "./App.css";
import React, { Component } from "react";
import HandRangeTemplate from "./components/HandRangeTemplate/HandRangeTemplate";
import { Provider } from "mobx-react";
import { MainStore } from "./stores/MainStore";

interface IAppProps {
    MainStore?: MainStore;
}

export default class App extends Component<IAppProps> {
    private stores = { MainStore: new MainStore() };

    // stores = null;
    // constructor(props) {
    //   super(props);

    //   this.stores = { MainStore: new MainStore() };
    // }

    render() {
        // const stores = { MainStore: new MainStore() };

        return (
            <div className="App">
                <Provider {...this.stores}>
                    <HandRangeTemplate />
                </Provider>
            </div>
        );
    }
}

// export default App;
