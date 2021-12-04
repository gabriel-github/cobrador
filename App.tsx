import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import AppLoading from "expo-app-loading";
import "intl";
import "intl/locale-data/jsonp/pt-BR";
import React from "react";
import { StatusBar } from "react-native";
import { ThemeProvider } from "styled-components";
import theme from "./src/global/styles/theme";
import { ServiceProvider } from "./src/hooks/serviceContext";
import { Routes } from "./src/routes";
import { AppRoutes } from "./src/routes/app.routes";
import { Dashboard } from "./src/screens/Dashboard";
import { Debtors } from "./src/screens/Debtors";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <ServiceProvider>
        <StatusBar barStyle="light-content" />
        <Routes />
      </ServiceProvider>
    </ThemeProvider>
  );
}
