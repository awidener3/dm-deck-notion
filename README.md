# DM Deck
DM Deck is a tool for dungeon/game masters of TTRP's like Dungeons & Dragons and Pathfinder. It allows you to define characters, monsters, and encounters. Once these are created, you can "run" the encounters where you define the initiative order, and then get a card view of each participant as you go through initiative.

The character cards are not descriptive, as it is most often the players job to track their stats and abilities. The monster cards, however, are much more descriptive and resemble a typical "monster card".

The app comes pre-loaded with [SRD](https://dnd.wizards.com/resources/systems-reference-document) monsters from Dungeons & Dragons. You are able to define your own monsters using this system.

## Tech
This project was built using [React](https://react.dev/) and [Vite](https://vitejs.dev/). It is styled using the [Tailwind](https://tailwindcss.com/) framework.

## Installation
A build is available [here](https://awidener3.github.io/dm-deck-notion/).

If you are wanting to [contribute](#contributing) begin by forking the repo. Clone the repo and navigate to the root folder using a command line interface. Install dependencies.

```zsh
npm install
```

To run the app in development mode, use the following script.

```zsh
npm run dev
```

To build the app, use the following script

```zsh
npm run build
npm run preview # view production build locally
```

## Contributing
This app is primarily a solo build, however if you are wanting to contribute, please follow the steps below.

### Steps
1. Follow the [installation](#installation) guide to fork the app, and clone to your machine.
2. Create an [issue](https://github.com/awidener3/dm-deck-notion/issues/new/choose) describing what you are wanting to add or fix.
3. On the sidebar of your issue, create a branch for the issue, setting the `repository destination` to your fork.
4. Complete work on the issue. Keep work focused on issue, and don't expand outside the scope of the issue.
5. Create a PR with your branch, and wait for it to be reviewed. You may receive comments or requests for changes.