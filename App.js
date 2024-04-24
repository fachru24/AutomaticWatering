import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigasi from './src/router/Navigasi';
import { AppProvider } from './src/backend/AppContext';

const App = () => {
  return (
    <AppProvider>
      <NavigationContainer>
        <Navigasi />
      </NavigationContainer>
    </AppProvider>

  );
};

export default App;

const styles = StyleSheet.create({
});
