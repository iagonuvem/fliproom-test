# Fliproom Test

## Requirements

The minimum requirements to run the app are described bellow:

| Tool | Version |
| ------ | ------ |
| Node JS | 18 or higher |
| Angular JS | 16.0.0 or higher |
| Ionic CLI | 7.11.1 |

## Instalation
If you did not got Ionic installed globaly, install it first:
```sh
npm install -g @ionic/cli
```

Install the packages with npm:
```sh
npm install
```

Run the app with ionic cli:
```sh
ionic serve
```

You are ready to go.

## Getting started with iOS
https://capacitorjs.com/docs/ios

## Running with simulator
```
ionic cap run ios --livereload --external --source-map=false --aot
```

## Syncing with xcode
```
npx cap sync
```