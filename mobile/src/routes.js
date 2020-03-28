import React from 'react';
import { createStackNavigator} from '@react-navigation/stack';

const AppStack = createStackNavigator();

import Incidents from './pages/Incidentes';
import Detail from './pages/Detail';
import { NavigationContainer } from '@react-navigation/native';

export default function Routes(){
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown: false }}>

                <AppStack.Screen name="Incidentes" component={Incidents} />
                <AppStack.Screen name="Detail" component={Detail} />

            </AppStack.Navigator>
        </NavigationContainer>
    )
}