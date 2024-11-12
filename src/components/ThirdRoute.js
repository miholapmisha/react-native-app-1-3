import {createStackNavigator} from '@react-navigation/stack';
import {CreateUserRoute} from './User/CreateUserRoute';
import {EditUserRoute} from './User/EditUserRoute';
import {UserPage} from "./User/UserPage";
import {CreateWalletRoute} from "./Wallet/CreateWalletRoute";
import {EditWalletRoute} from "./Wallet/EditWalletRoute";
import {WalletPage} from "./Wallet/WalletPage";

const Stack = createStackNavigator();

export const ThirdRoute = () => {

    return (
        <Stack.Navigator initialRouteName="UserPage">
            <Stack.Screen
                options={{headerShown: false}}
                name="UserPage"
                component={UserPage}
            />
            <Stack.Screen
                options={{title: ''}}
                name="CreateUserRoute"
                component={CreateUserRoute}
            />
            <Stack.Screen
                options={{title: ''}}
                name="EditUserRoute"
                component={EditUserRoute}
            />
            <Stack.Screen
                options={{title: ''}}
                name="WalletPage"
                component={WalletPage}
            />
            <Stack.Screen
                options={{title: ''}}
                name="CreateWalletRoute"
                component={CreateWalletRoute}
            />
            <Stack.Screen
                options={{title: ''}}
                name="EditWalletRoute"
                component={EditWalletRoute}
            />
        </Stack.Navigator>
    )
}