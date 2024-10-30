import { CounterPage } from "./components/CounterPage"
import { TabViewHolder } from "./components/TabViewHolder"
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="CounterPage">
                <Drawer.Screen name="Counter Page" component={CounterPage} />
                <Drawer.Screen name="Tab Activity" component={TabViewHolder} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default App;