import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Details from './pages/Details';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

export default function createRouter(isSigned = false) {
  function DashboardRoot() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ headerMode: 'screen', headerShown: false }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{
            headerBackTitleVisible: false,
            headerTitle: 'Detalhes da encomenda',
            headerTitleStyle: { fontWeight: 'bold' },
            headerTransparent: true,
            headerTintColor: '#fff',
          }}
        />
      </Stack.Navigator>
    );
  }

  function Root() {
    return (
      <Tabs.Navigator
        tabBarOptions={{
          activeTintColor: '#7D40e7',
          inactiveTintColor: '#999',
          style: {
            height: 65,
            paddingBottom: 10,
          },
          labelStyle: {
            fontSize: 14,
            marginTop: -8,
          },
          keyboardHidesTabBar: true,
        }}
      >
        <Tabs.Screen
          name="Entregas"
          component={DashboardRoot}
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon
                name="reorder"
                size={26}
                color={focused ? '#7d40e7' : '#999'}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="Meu Perfil"
          component={Profile}
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon
                name="account-circle"
                size={26}
                color={focused ? '#7d40e7' : '#999'}
              />
            ),
          }}
        />
      </Tabs.Navigator>
    );
  }

  return (
    <Stack.Navigator>
      {isSigned ? (
        <Stack.Screen
          name="Root"
          component={Root}
          options={{ headerMode: 'screen', headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ headerMode: 'screen', headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
}
