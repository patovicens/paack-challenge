import React from 'react';
import type {Node} from 'react';

import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import deliveriesReducer from './src/features/deliveries';
import {HomeScreen} from './src/screens/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DetailsScreen} from './src/screens/Details';

export const store = configureStore({
  reducer: {
    deliveries: deliveriesReducer,
  },
});

const Stack = createNativeStackNavigator();

const App: () => Node = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
