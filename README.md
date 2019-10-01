<!--
*** Thanks for checking out this README Template. If you have a suggestion that would
*** make this better, please fork the repo and create a pull request or simply open
*** an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
-->





<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<p align="center">

  <h3 align="center">PolyDessin LOG2990  - Projet de logiciel d’application Web</h3>

  <p align="center">
    Le projet consiste à créer une application Web de dessin vectoriel. 
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## Table des matières

* [Description du projet](#description-projet)
  * [Technologies utilisées](#technologies-utilisees)
* [Démarrer le projet](#demarrer-le-projet)
  * [Prérequis](#prerequis)
  * [Installation](#installation)
* [Utilisation](#usage)
* [Dépendances](#dependences)



<!-- ABOUT THE PROJECT -->
## description-projet

Le rendu visuel de reference de l'application pourrait etre similaire a celui de Sketch pad.
* Outils de tracage
* Crayon :Il s'agit de l'outil de base du logiciel de dessin.Il est de forme ronde
* Pinceau :Cet outil differe du crayon par la texture du trait
* Plume:Outil de tracage qui differe du crayon par la forme mince de sa pointe
* Stylo:Cet outil differe du crayon par le fait que la surface de dessin s'amincit en fonction de la vitesse de deplacement de la souris
* Aerosol: cete outil simule un effet de peinture en aerosol
* Forme: On dispose de differentes formes geometriques (Rectangle,Ellipse,Polygone,Ligne,Texte) pour effectuer un dessin composee. Ces dernieres sont apposes sur la zone de dessin en faisant un glisser-deposer.
* Sceau de peinture: il s'agit d'un outil qui change la couleur d'une certaine region
* Efface: Cet outil permet de supprimer des objets de la surface de dessin

### technologies-utilisees
Cette section énumère les technologies principales utilisées afin de construire l'application
* [Angular](https://angular.io)
* [NodeJs](https://nodejs.org/)



<!-- GETTING STARTED -->
## demarrer-le-projet

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### prerequis

* npm
* Nodemon

### Installation

- Installer `npm` (non recommandé) ou `yarn` (très recommandé). `npm` viens avec `Node` que vous pouvez télecharger [ici](https://nodejs.org/en/download/)

- Lancer `npm install` ou `yarn`

Pour lancer l'application, il suffit d'exécuter: `npm start` ou `yarn start`. Vous devez lancer cette commande dans le dossier `client` et `server`

Pour le client : 
    Une page menant vers `http://localhost:4200/` s'ouvrira automatiquement.

Pour le serveur :
    Votre serveur est accessible sur `http://localhost:3000`. Par défaut, votre client fait une requête `GET` vers le serveur pour obtenir un message.


L'application se relancera automatiquement si vous modifiez le code source de celle-ci.



<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_



<!-- ROADMAP -->
## Roadmap

Voir sur trello les issues [open issues](https://trello.com/b/wCeGjPCQ/log2990-a2019-equipe-16) 



<!-- ACKNOWLEDGEMENTS -->
## dependences
* font-awesome
* material module





<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=flat-square
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=flat-square
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=flat-square
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=flat-square
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=flat-square
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
