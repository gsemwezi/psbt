# Psbt

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
It correctly bundles React in production mode and optimizes the build for the best performance.

The application enables a user to create a Segwit (p2pWKH) PSBT transaction.\
The Hiro wallet is a prerequisite for running the application.\
The application starts requires connection to the wallet.\

## Pending tasks
- Adding tests
- Adding storybook completing styling
- Fixing bug around state persistence with redux-persist. Reloading will redirect to the Login page despite the state being persisted.
- Fixing bug where the network rejects a transaction because fees are too low
- Updating the submit psbt form to use bitcoins and not satoshi   



