# Volto
<img align="right" width="300" alt="Volto png" src="./docs/logos/volto-colorful.png" />

[![Build Status](https://travis-ci.org/plone/volto.svg?branch=master)](https://travis-ci.org/plone/volto)
[![Coverage](https://img.shields.io/coveralls/plone/volto.svg)](https://coveralls.io/github/plone/volto)
[![Dependencies](https://img.shields.io/david/plone/volto.svg)](https://github.com/plone/volto/blob/master/package.json)
[![Dev Dependencies](https://img.shields.io/david/dev/plone/volto.svg)](https://github.com/plone/volto/blob/master/package.json)
[![NPM](https://img.shields.io/npm/v/@plone/volto.svg)](https://www.npmjs.com/package/@plone/volto)
[![Netlify
Status](https://api.netlify.com/api/v1/badges/b8310579-ac4f-41f2-a144-9c90fca9b38f/deploy-status)](https://app.netlify.com/sites/voltocms/deploys)

## Introduction

[Volto](https://github.com/plone/volto) is a React-based frontend for content
management systems, currently supporting three backend implementations: Plone,
Guillotina and a NodeJS reference implementation.

[Plone](https://plone.org) is a CMS built on Python with over 17 years of experience.

Plone has very interesting features that appeal to developers and users alike,
such as customizable content types, hierarchical URL object traversing and a
sophisticated content workflow powered by a granular permissions model. This
allows you to build anything from simple websites to enterprise-grade
intranets.

Volto exposes all these features and communicates with Plone via its
mature [REST API](https://github.com/plone/plone.restapi). Volto has the
ability of being highly themable and customizable.

Volto also supports other APIs like [Guillotina](https://guillotina.io/), a
Python resource management system, inspired by Plone and using the same basic
concepts like traversal, content types and permissions model.

Last but not least, it also supports a [Volto Nodejs-based backend reference](https://github.com/plone/volto-reference-backend) API implementation that
demos how other systems could also use Volto to display and create content
through it.

## Quick Start

First get all the requirements installed on your system.

### Prerequisites

- [Node.js LTS (12.x)](https://nodejs.org/)
- [Python 3.7.x / 2.7.x](https://python.org/) or
- [Docker](https://www.docker.com/get-started) (if using the Plone/Guillotina docker images)

### Create Volto App

Create a new Volto project by using the `create-volto-app` utility.

It will bootstrap a Volto project in a folder of your choice with all the required
boilerplate to start customizing your Volto site.

    $ npm install -g yarn
    $ npm install -g @plone/create-volto-app
    $ create-volto-app myvoltoproject
    $ cd myvoltoproject

Although we install and use `yarn`, the `create-volto-app` tool still needs to be
installed using `npm -g` because `yarn` has a different implementation of
global installs.

### Bootstrap the Plone API backend

We recommend Plone as backend of choice for Volto.

You can bootstrap a ready Docker Plone container with all the dependencies and ready for Volto use:

```shell
docker run -it --rm --name=plone -p 8080:8080 -e SITE=Plone -e ADDONS="kitconcept.volto" -e ZCML="kitconcept.volto.cors" -e PROFILES="kitconcept.volto:default-homepage" plone
```

or as an alternative if you have experience with Plone and you have all the
dependencies installed on your system, you can use the supplied buildout in the
`api` folder by issuing the command:

```shell
make build-backend
```

### Start Volto

Once inside your Volto project folder:

```shell
yarn start
```

### Browsing

Go to [http://localhost:3000](http://localhost:3000) in your browser.

## Demo

You can try a Volto online demo in [https://volto.kitconcept.com](https://volto.kitconcept.com)

## Volto in Production

Volto is actively developed since 2017 and used in production since 2018 on the following websites:

- [VHS Ehrenamtsportal](https://vhs-ehrenamtsportal.de) (Website to help volunteers that help refugees for the [German Adult Education Association](https://www.dvv-vhs.de/en/home/), developed by [kitconcept GmbH](https://kitconcept.com), 2018)
- [Zeelandia](https://zeelandia.de) (Corporate website for one of the leading backery ingrediences manufactors in Germany, developed by [kitconcept GmbH](https://kitconcept.com), 2019)
- [Excellence at Humboldt-Universität zu Berlin](https://www.alles-beginnt-mit-einer-frage.de) (Website for the excellence initiative of the [Humboldt University Berlin](https://hu-berlin.de), developed by [kitconcept GmbH](https://kitconcept.com), 2019)
- [Forest Information System for Europe](https://forest.eea.europa.eu) (Thematic website focusing on European forests, developed by [Eau de Web](https://www.eaudeweb.ro), 2019)
- [Talke Carrer Website](https://karriere.talke.com/) (Carrer website for [Talke](https://www.talke.com), one of the leading a chemical and petrochemical logistics companies in Germany, developed by [kitconcept GmbH](https://kitconcept.com), 2020)
- [Stradanove](http://www.stradanove.it/) (Website of the Department of Youth Policies of the Municipality of Modena, developed by [RedTurtle](https://redturtle.it), 2020)
- [Study guide at University of Jyväskylä](https://studyguide.jyu.fi/2020/) (Static website where [Volto is used as a headless CMS for authoring additional content](https://tech.blog.jyu.fi/2020/06/plone-volto-hasura-gatsbyjs-mashup/), 2020)
- [Nuova Voce Ecologista](https://nuovavoceecologista.it) (Website of Nuova Voce Ecologista, an Italian green Party, 2020)
- Please create a new [issue](https://github.com/plone/volto/issues/new) or [pull request](https://github.com/plone/volto/pulls) to add your Volto-site here!

## Documentation

You can find the (beta) documentation in [http://docs.voltocms.com](http://docs.voltocms.com)

## Training

A detailed training on how to create your own website using Volto is available
as part of the Plone training docs at [https://training.plone.org/5/volto/index.html](https://training.plone.org/5/volto/index.html).

## Talks

### Plone Conference Ferrara 2019

[Víctor Fernández de Alba - Plone Beyond 2020: Jump into Volto today!](https://www.youtube.com/watch?v=8QrGOgXo1Js&list=PLGN9BI-OAQkQD9HliElIk9pe-8O_Y6S04&index=16&t=0s)

[Rob Gietema - How to create your own Volto site!](https://www.youtube.com/watch?v=3QLN8tsjjf4&list=PLGN9BI-OAQkQD9HliElIk9pe-8O_Y6S04&index=11&t=0s)

[Timo Stollenwerk - On the Road - Plone 6 and Beyond](https://www.youtube.com/watch?v=suXVdfYV2kA&list=PLGN9BI-OAQkQD9HliElIk9pe-8O_Y6S04&index=14&t=0s)

[Rodrigo Ferreira de Souza - Data migration to Plone 5.2 and Volto](https://www.youtube.com/watch?v=kb9SEsnllqE&list=PLGN9BI-OAQkQD9HliElIk9pe-8O_Y6S04&index=49&t=0s)

[Nicola Zambello - A Volto story: building a website by prototyping](https://www.youtube.com/watch?v=xtxJURICkWc&list=PLGN9BI-OAQkQD9HliElIk9pe-8O_Y6S04&index=17&t=0s)

[Luca Pisani - Plone and React.js: An interview to Volto](https://www.youtube.com/watch?v=JZFUOG843no&list=PLGN9BI-OAQkQD9HliElIk9pe-8O_Y6S04&index=26&t=0s)

### Plone Conference Tokyo 2018

[Rob Gietema - Volto](https://2018.ploneconf.org/talks/plone-react)

[Rob Gietema / Víctor Fernández de Alba - Volto Extensibility Story](https://2018.ploneconf.org/talks/plone-react-extensibility-story)

[Víctor Fernández de Alba - Theming Volto](https://2018.ploneconf.org/talks/theming-plone-react)

[Timo Stollenwerk / Víctor Fernández de Alba / Ramon Navarro - Volto Case Studies](https://2018.ploneconf.org/talks/plone-react-case-studies-when-stability-and-security-meet-speed-and-a-modern-user-interface)

[Timo Stollenwerk - Reinventing Plone, Roadmap to the Modern Web](https://2018.ploneconf.org/talks/reinventing-plone-roadmap-to-the-modern-web)

## Browser support

Volto works well with any modern (and updated) browser, including their mobile
flavors: Chrome, Firefox, Safari, Edge.

We do not guarantee that browsers who were deprecated by their vendors (e.g. Internet Explorer 11) will be supported by Volto in the future.

## Upgrades

You can find the upgrade guide here: https://docs.voltocms.com/upgrade-guide/

## Volto Development

For Volto development you need all the requirements already mentioned on the
[Quick Start](#quick-start) section.

### Checkout the Volto repository

```shell
git clone https://github.com/plone/volto.git
```

### Install dependencies

```shell
yarn
```

### Install a backend

#### Plone (recommended)

Either using a Docker image

```shell
docker run -it --rm --name=plone -p 8080:8080 -e SITE=Plone -e ADDONS="kitconcept.volto" -e ZCML="kitconcept.volto.cors" -e PROFILES="kitconcept.volto:default-homepage" plone
```

or using the convenience makefile command:

```shell
make start-backend-docker
```

or running Plone on your machine (advanced), additional dependencies might be
required, only for Plone experienced integrators/developers. Check the [Plone
Installation Documentation](https://docs.plone.org/manage/installing/installation.html).

```shell
make build-backend
```

#### Guillotina (experimental)

It still doesn't support the full API/features that Plone provides.

```shell
docker-compose -f g-api/docker-compose.yml up -d
```

or using the convenience makefile command:

```shell
make start-backend-docker-guillotina
```

### Run frontend

```shell
yarn start
```

### Browsing

Browse to [http://localhost:3000](http://localhost:3000) in your browser.

### Testing

```shell
yarn test
```

### Releasing

For ease the release process, we use `release-it` utility that helps with the process.

https://www.npmjs.com/package/release-it

For using it and start a release you need to fulfill the requirements:

- Have permissions to push on master branch
- Have permissions on the @plone org on npmjs.com
- Have a environment variable (`GITHUB_TOKEN`) with a GitHub personal token with permissions to
  write the Volto Release page on GitHub (https://www.npmjs.com/package/release-it#github-releases)

Then the command for release:

```shell
yarn release
```

a dry-release command for testing the output is also available:

```shell
yarn dry-release
```

### Acceptance testing

Volto uses [Cypress](https://www.cypress.io/) for browser-based acceptance testing.

Run acceptance tests (with the Plone backend):

```shell
yarn ci:cypress:run
```

Run acceptance tests (with the Guillotina backend):

```shell
yarn ci:cypress:run:guillotina
```

#### Writing new acceptance tests

When writing new acceptance tests you usually want to minimize the time it takes to run the tests.

To do so, start three individual terminal sessions for running the Plone backend, the Volto frontend and the acceptance tests.

Start the Plone backend:

```shell
make start-test-backend
```

Start the Volto frontend:

```shell
make start-test-frontend
```

Open Cypress and start acceptance tests:

```shell
make start-test
```

Go to the `cypress/integration` folder to see existing tests.
This directory is hot reloaded with your changes as you write the tests. For more information on how to write Cypress tests:

    https://docs.cypress.io

#### Running the acceptance tests with Guillotina backend

If you want to use Guillotina as backend to run the tests you should run:

```shell
yarn ci:start-api-plone-guillotina
```

## Translations

If you would like contribute to translate Volto into several languages, please, read the [Internationalization (i18n) guide](https://docs.voltocms.com/customizing/i18n/).


## License

MIT License. Copyrights hold the [Plone Foundation](https://plone.org/foundation).

See [LICENSE.md](LICENSE.md) for details.
