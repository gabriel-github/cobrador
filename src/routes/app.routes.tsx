import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "styled-components";
import { Dashboard } from "../screens/Dashboard";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import { Debtors } from "../screens/Debtors";
import { Platform } from "react-native";
import { Register } from "../screens/Register";

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  const theme = useTheme();

  return (
    <Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarLabelPosition: "beside-icon",
        headerShown: false,
        tabBarStyle: {
          paddingVertical: Platform.OS === "ios" ? 20 : 0,
          height: 88,
        },
      }}
    >
      <Screen
        name="Clientes"
        component={Dashboard}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="users" size={size} color={color} />
          ),
        }}
      />
      <Screen
        name="Devedores"
        component={Debtors}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="user-minus" size={size} color={color} />
          ),
        }}
      />
      <Screen
        name="Registro"
        component={Register}
        options={{
          tabBarIcon: ({ size, color }) => (
            <AntDesign name="form" size={size} color={color} />
          ),
        }}
      />
    </Navigator>
  );
}
