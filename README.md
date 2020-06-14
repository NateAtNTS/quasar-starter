# Quasar Starter Project
This project has a prebuilt in user management and some interface options using the [Quasar](https://quasar.dev/)
frontend framework.  It is automatically setup to use a specific [Base API Starter](https://github.com/NateAtNTS/baseapi-starter).  The
goal between this Quasar Starter and the Base API Starter is to encapsulate common fuctionality and enable rapid application
development.

This starter project has a compiled version of the app in the /dist/spa/ folder.  The precompiled version just
has user management ready to use with the Base API starter project.

# Installation of Quasar
Install Quasar by
```shell script
# Node.js >=10 is required.

$ yarn global add @quasar/cli
# or
$ npm install -g @quasar/cli
```
See more information at the [Quasar Installation Page](https://quasar.dev/quasar-cli/installation)

# Fav Icon
Quasar recommends using the [icon genie](https://quasar.dev/icongenie/installation).  The
list of commands for icon genie can be found [here](https://quasar.dev/icongenie/command-list).

## Installation
```shell script
$ yarn global add @quasar/icongenie
# or
$ npm install -g @quasar/icongenie
```

## Generate a Fav Icon
Create a PNG file at least 1024 x 1024.  Make sure you are in the root of the project.
```shell script
icongenie generate -i /path/to/icon.png
```


# Quasar App Colors/Theme
Quasar recommends using [this theme builder](https://quasar.dev/style/theme-builder).  You can then
copy the theme styles to the `/src/css/quasar.variables.sass` directory.


# Quasar .env Files
There are two .env files: `.env.dev` and `.env.prod` which will need to be edited.  The following values
will need to be edited in both to properly setup the project.
```shell script
APP_NAME='Quasar Starter Project'

API_BASEURL='http://baseapi.test/'
```

# Change the Local Storage Key
If you use this starter project, you will need to change the local storage key that stores
the user credentials.
- Do a project search for instances of `localStorage.`
- Change the Key to a unique key.


# Quasar Commands
- `quasar dev`
- `quasar build`

# Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).

