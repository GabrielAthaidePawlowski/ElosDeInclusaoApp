import { Stack } from 'expo-router';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';

// Impede que a tela de splash suma antes das fontes carregarem (opcional)
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  
  useEffect(() => {
    // Esconde a tela de carregamento inicial
    SplashScreen.hideAsync();
  }, []);

  return (
    <Stack>
      {/* Tela Inicial (Landing Page) */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
      
      {/* Grupo de Abas do Tutor */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      
      {/* Configuração para outras telas se necessário */}
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
  );
}