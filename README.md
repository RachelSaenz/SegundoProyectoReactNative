This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started
## Módulo de Participación (RSVP) y Notificaciones

El módulo de Participación (RSVP) y Notificaciones se encarga de gestionar la asistencia de los usuarios a los eventos y de enviar recordatorios previos a la fecha programada. Para ello se implementó un contexto global de eventos ("EventsContext") que centraliza la información de cada evento (título, fecha, lugar, descripción, estado de asistencia y id de recordatorio) y expone funciones para confirmar o cancelar la asistencia ("toggleRSVP") y para registrar el identificador de la notificación asociada ("updateEventReminderId"). Este contexto envuelve toda la aplicación desde "App.tsx" mediante el componente "EventsProvider", lo que permite acceder al estado de los eventos desde cualquier pantalla del flujo.

Sobre esta base se desarrolló un servicio de notificaciones locales ("NotificacionService") utilizando la librería "react-native-push-notification". Este servicio ofrece dos operaciones principales: "scheduleReminderForEvent", que programa una notificación local una hora antes del evento seleccionado, y "cancelReminder", que cancela el recordatorio previamente configurado. De esta forma, cuando el usuario confirma su asistencia a un evento, se agenda automáticamente una notificación con el título y la información del evento; si el usuario decide dejar de asistir, la notificación se elimina para evitar recordatorios innecesarios.

La interacción con el usuario se realiza a través de dos pantallas principales: "EventListScreen" y "EventDetailScreen". En "EventListScreen" se muestra una lista de eventos obtenidos desde el contexto y se permite navegar al detalle de cada uno. En "EventDetailScreen" se visualiza la información completa del evento y se incluye un botón que permite confirmar o cancelar la asistencia; esta acción actualiza el estado global en "EventsContext" y dispara las funciones del servicio de notificaciones según corresponda (programar o cancelar el recordatorio). Finalmente, se realizaron ajustes en la configuración de TypeScript ("tsconfig.json" y archivos de declaración ".d.ts") para habilitar JSX y reconocer correctamente la librería de notificaciones, asegurando que el módulo se integre de forma consistente con el resto de la aplicación.

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
