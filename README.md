# React Native Expo App Installation Guide

## Prerequisites
Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (Latest LTS version recommended)
- [Git](https://git-scm.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Expo Go](https://expo.dev/client) (for running on a mobile device)

## Cloning the Repository

1. Open your terminal and navigate to the directory where you want to clone the repository.
2. Run the following command to clone the repository:
   ```sh
   git clone https://github.com/dilip884400/Fitness-Tracker-App.git
   ```
3. Navigate into the project folder:
   ```sh
   cd Fitness-Tracker-Ap
   ```

## Installing Dependencies

Run the following command to install the required dependencies:
```sh
npm install
```

or using Yarn:
```sh
yarn install
```

## Running the App Locally

To start the Expo development server, run:
```sh
npm start
```

or using Yarn:
```sh
yarn expo start
```

This will open the Expo Developer Tools in your browser.

## Running on a Physical Device (Expo Go)

1. Install the EXPO GO app on your mobile device (available on iOS and Android).
2. Ensure your mobile device and your development machine are connected to the same Wi-Fi network.
3. Scan the QR code displayed in the terminal or Expo Developer Tools using the Expo Go app.
4. The app should launch on your mobile device.

## Running on an Emulator/Simulator

### Android Emulator

1. Install [Android Studio](https://developer.android.com/studio) and set up an Android Virtual Device (AVD).
2. Start the emulator.
3. Run the following command in the terminal:
   ```sh
   npx expo start
   ```
4. Press `a` in the terminal to launch the app on the Android emulator.

### iOS Simulator (Mac Only)

1. Install [Xcode](https://developer.apple.com/xcode/).
2. Ensure Xcode Command Line Tools are installed:
   ```sh
   sudo xcode-select --install
   ```
3. Start the iOS simulator using:
   ```sh
   npx expo start
   ```
4. Press `i` in the terminal to launch the app on the iOS simulator.

## Troubleshooting

- If dependencies fail to install, try clearing the cache:
  ```sh
  rm -rf node_modules package-lock.json && npm install
  ```
  or using Yarn:
  ```sh
  rm -rf node_modules yarn.lock && yarn install
  ```
- If the Expo server does not start, restart it using:
  ```sh
  npx expo start --clear
  ```

## Building the App (Optional)
To create a standalone app for iOS or Android, use Expo's build service:
```sh
npx expo prebuild
```
For more details, refer to [Expo Documentation](https://docs.expo.dev/build/introduction/).

## Contributing
If you'd like to contribute, please fork the repository and create a pull request.

## License
This project is licensed under the MIT License.

