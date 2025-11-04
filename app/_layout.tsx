import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {SplashScreen, Stack} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import 'react-native-reanimated';


import {GluestackUIProvider} from '@/components/ui/gluestack-ui-provider';
import '@/global.css';
import {useColorScheme} from "@/theme/use-color-scheme";
import {useAppInitializer} from "@/core";
import {useEffect} from "react";

export const unstable_settings = {
  anchor: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const {loading} = useAppInitializer();

  useEffect(() => {
    SplashScreen.hide();
  }, [loading]);

  return (

    <GluestackUIProvider mode="dark">
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
        </Stack>
        <StatusBar style="auto"/>
      </ThemeProvider>
    </GluestackUIProvider>

  );
}
