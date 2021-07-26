import React, { Component } from 'react';
import './App.css';
import auth0Client from './Auth';
import Navigation from './Components/Navigation';
import Image from "./images/edificio-nuevo.jpg"
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';

class Home extends Component {
    Seguridad
    componentDidMount() {
        /*if (!auth0Client.isAuthenticated()) {
            auth0Client.signIn();
        }*/
    }
    signOut = () => {
        auth0Client.signOut();
        this.props.history.replace('/');
    }
    render() {
        return (
            <div>
                <header>
                    <Navigation />
                </header>
                <br />
                <img src={Image} alt="Hello" height="945px" />
                <div class="centered">
                    <br />
                    <br />
                    <h1>CoopApp</h1>
                    <h3>CoopApp es una plataforma web que soluciona este problema con un sistema fácil de usar, eficiente y a un precio Accesible, brindando además añadidos importantes como ser una backup de la información.
</h3>
                </div>
                <footer >
                    <div class="copyright" >
                        <div class="container-fluid" >
                            <h3 style={{ textAlign: "right" }}>© Copyright Mario Rubio 2021  < FacebookIcon color="secundary" />< TwitterIcon color="secundary" />< InstagramIcon color="secundary" /></h3>
                        </div>
                    </div>
                </footer>

            </div >
        )
    }

}

export default Home;