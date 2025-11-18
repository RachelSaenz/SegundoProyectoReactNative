import { GoogleSignin } from '@react-native-google-signin/google-signin';

export function configureGoogleSignIn() {
  GoogleSignin.configure({
    webClientId: '423350572737-bh8kcq0aohflq79n4rd38c6eao2up0vk.apps.googleusercontent.com',
  });
}
