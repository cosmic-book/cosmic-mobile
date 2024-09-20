import Toast, { BaseToast, ErrorToast, InfoToast } from 'react-native-toast-message';

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: '#16c52a' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400'
      }}
      text2Style={{
        fontSize: 12
      }}
    />
  ),
  warning: (props: any) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: '#fc8e07' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400'
      }}
      text2Style={{
        fontSize: 12
      }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: '#d60f0f' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400'
      }}
      text2Style={{
        fontSize: 12
      }}
    />
  ),
  info: (props: any) => (
    <InfoToast
      {...props}
      style={{ borderLeftColor: '#0f3ad6' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400'
      }}
      text2Style={{
        fontSize: 12
      }}
    />
  ),
};

export function CustomToast() {
  return <Toast config={toastConfig} />;
}