import React, { Component } from "react";
import "./App.css";
import Membre from "./Components/Membre.jsx";
import Button from "./Components/Button";
// import Footer from "./Components/Footer.jsx";

const famille = {
  membre1: {
    nom: "Julien",
    age: 37,
  },
  membre2: {
    nom: "Ségolène",
    age: 72,
  },
  membre3: {
    nom: "Eleanor",
    age: 27,
  },
  membre4: {
    nom: "Kali",
    age: 1,
  },
};

class App extends Component {
  state = {
    famille,
    isShow: false,
  };

  handleClick = (num) => {
    const famille = { ...this.state.famille }; // premièrement je copie mon state pour avoir un object famille qui reproduit mon state à son état actuel
    famille.membre1.age += num; // 2èmement je fais mes modification dessus, sur cette copie, j'ajoute 1 à l'âge du membre 1
    this.setState({ famille }); // ensuite je met à jour le state où on lui passe un objet et le state se met à jour
  };

  handleChange = (event, id) => {
    const famille = { ...this.state.famille }; // on copie notre state
    const nom = event.target.value; // on fait des modifications
    // console.log(nom);
    famille[id].nom = nom;
    this.setState({ famille }); // on met à jour le state avec this.setState
  };

  hideName = (id) => {
    const famille = { ...this.state.famille };
    famille[id].nom = "X";
    // console.log(nom);
    this.setState({ famille });
  };

  handleShowDescription = () => {
    const isShow = !this.state.isShow;
    this.setState({ isShow });
  };

  render() {
    const { titre } = this.props;
    const { famille, isShow } = this.state;

    let description = null;

    if (isShow) {
      description = <strong>Je suis un petit chat</strong>;
    }

    const liste = Object.keys(famille).map(
      (
        membre // On affiche notre liste (ici de membre) avec .map qui sert à faire une boucle autour d'un certain nombres de données qui sont dans un tableau (ici tjrs membre)
      ) => (
        <Membre
          key={membre}
          handleChange={(event) => this.handleChange(event, membre)}
          hideName={() => this.hideName(membre)}
          age={famille[membre].age}
          nom={famille[membre].nom}
        />
      )
    );
    // console.log(liste);

    return (
      <div className="App">
        <h1> {titre} </h1>
        {/* composant réutilisable à souhait, par exemple un form, etc... */}

        {/* <Membre age={famille.membre4.age} nom={famille.membre4.nom} /> */}
        {liste}
        <button onClick={this.handleShowDescription}>
          {isShow ? "Cacher" : "Montrer"}
        </button>
        {description}

        <Button vieillir={() => this.handleClick(5)} />
      </div>
    );
  }
}

export default App;
