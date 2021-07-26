import React, { Component } from 'react';
import './App.css';
import auth0Client from './Auth';
import Navigation from './Components/Navigation';
import Image from "./images/edificio-nuevo.jpg"
import Image2 from "./images/Artboard 9@4x.png"

class Home extends Component {
    Seguridad
    componentDidMount() {
        if (!auth0Client.isAuthenticated()) {
            auth0Client.signIn();
        }
    }
    signOut = () => {
        auth0Client.signOut();
        this.props.history.replace('/');
    }
    render() {

        return (
            <div>
                {/* <header>
                    <Navigation />
              {
                        auth0Client.isAuthenticated() &&
                        <div>
                            <label className="mr-2 text-white">{auth0Client.getProfile().name}</label>
                            <br />
                            <button className="btn btn-dark" onClick={() => { this.signOut() }}>Sign Out</button>
                        </div>
                    } 
                </header> */}

                <Navigation />
                <br />
                <img src={Image} alt="Hello" height="945px" />
                <div class="centered">
                    <br />
                    <br />
                    <h1>CoopApp</h1>
                    <h3>CoopApp es una plataforma web que soluciona este problema con un sistema fácil de usar, eficiente y a un precio Accesible, brindando además añadidos importantes como ser una backup de la información.
</h3>
                </div>
            </div >
        )
    }

}

export default Home;