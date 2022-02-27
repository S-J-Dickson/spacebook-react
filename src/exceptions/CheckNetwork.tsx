import { showMessage } from 'react-native-flash-message';

export default function checkNetwork(error: string) {
  if (error === 'Network Error') {
    showMessage({
      message: 'Please connect to the internet.',
      type: 'warning',
    });
  }
}
