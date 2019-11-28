<div align="center">
  <a href="https://wooof.ch"><img src="public/assets/icon/wooof-logo.svg" alt="Wooof logo" height="160"></a>
  
  <br/>
  
  <p><strong>Wooof</strong> - An application to browse the internet's biggest collection of open source dog pictures.</p>
  
  <p>I have developed it to experiment <a href="https://ionicframework.com/docs/react">Ionic + React</a> for the <a href="https://www.meetup.com/fr-FR/Ionic-Zurich/events/265767496/">Ionic Zürich Meetup</a> Thursday 5th December 2019.</p>
  
  <br/>
  
  ![Website](https://img.shields.io/website?label=Progressive%20Web%20Apps&url=https%3A%2F%2Fdeckdeckgo.com)
  [![GitHub release](https://img.shields.io/github/release/peterpeterparker/wooof/all?logo=GitHub)](https://github.com/peterpeterparker/wooof/releases/latest)
  [![Tweet](https://img.shields.io/twitter/url?url=https%3A%2F%2Fwooof.ch)](https://twitter.com/intent/tweet?url=https%3A%2F%2Fwooof.ch&text=Woof+-+An+application+to+browse+the+internet%27s+biggest+collection+of+open+source+dog+pictures.)
</div>

---


## Table of contents

- [Getting Started](#getting-started)
- [Dog API](#dog-api)
- [Development](#development)
- [License](#license)

## Getting Started

Beside the learning of using Ionic and React, the following features and topics have been covered and implemented in this app.

- Fetch API data with Hooks
- Add components and pass properties
- Navigation with parameters
- Infinite scroll and refresher
- Picker (triggered with a controller)
- Toast (triggered with a state)
- Including and using a Stencil Web Component
- Capacitor plugins share and storage
- Services worker to cache images
- Deploy with GitHub Actions

I intend to probably write one or some blog posts about the above subjects 😇

## Dog API

The API used in this application to browse and display doggos is the [Dog API](https://dog.ceo/dog-api/), the internet's biggest collection of open source dog pictures.

Moreover than being **open source** and **free**, this API also allows **CORS** requests.

Side note: You could find more free APIs in the [public-apis](https://github.com/public-apis/public-apis) GitHub repo.

## Development

To develop and run this application locally, proceed as following:

```
git clone https://github.com/peterpeterparker/wooof
cd wooof
npm install
ionic serve
```

## License

MIT © [David Dal Busco]

[David Dal Busco]: https://daviddalbusco.com
