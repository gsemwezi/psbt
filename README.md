# Psbt

## Prerequisites
- Hiro wallet

## Features
- Authentication
- View current bitcoin balance of account connected with wallet
- View a list of unconfirmed and confirmed transactions
- Create a psbt transaction

## Pending tasks
- Fixing bug where the network rejects a transaction because fees are too low even if the recommended fees are relatively low.
- Updating the submit psbt form to use bitcoins and not satoshi
- Updating the account balance to reflect pending transactions that either increase or decrease its value
- Extending the app to send Taproot psbts. I was not able to find a faucet for that would accept a taproot address
- Adding tests (run out of time trying to resolve signing, broadcasting and fees issues)
- Adding storybook and completing styling
- Fixing bug around state persistence with redux-persist. Reloading will redirect to the Login page despite the state being persisted.

## Available Scripts

In the project directory, you can run:

### `npm install`

Installs application dependencies

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\





