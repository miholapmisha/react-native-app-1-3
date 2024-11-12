import {CounterPage} from "./src/components/CounterPage"
import {TabViewHolder} from "./src/components/TabViewHolder"
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {useEffect} from "react";
import {createUserTable} from "./src/db/user";
import {createWalletTable} from "./src/db/wallet";

const Drawer = createDrawerNavigator();

const App = () => {

    useEffect(() => {
        const loadInitialTableIfNeeded = async () => {
            await createUserTable()
            await createWalletTable()
        }
        loadInitialTableIfNeeded()
    }, [])

    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="CounterPage">
                <Drawer.Screen name="Counter Page" component={CounterPage}/>
                <Drawer.Screen name="Tab Activity" component={TabViewHolder}/>
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default App;