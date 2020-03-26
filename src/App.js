import React from 'react';
import { Provider } from "react-redux";
import './App.css';
import Header from "./Components/Header/Header";
import Main from "./Components/Main/Main";
import Footer from "./Components/Footer/Footer";
import {store} from "./engine/init/store";

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <Header/>
                <Main/>
                <Footer/>
            </div>
        </Provider>
    );
}

export default App;
