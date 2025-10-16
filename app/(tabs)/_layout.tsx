import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CustomBottomTabs from "../../components/CustomTabBar";
import HomeScreen from "./index";
import ProfileScreen from "./profile";
import SavedScreen from "./saved";
import SearchScreen from "./search";

const Tab = createBottomTabNavigator();

export default function AppTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
            }}
            tabBar={
            (props) => <CustomBottomTabs {...props} />
        }>
            <Tab.Screen name="home" component={HomeScreen} options={{
                tabBarStyle: { backgroundColor: "transparent" },
            }}/>
            <Tab.Screen name="saved" component={SavedScreen} />
            <Tab.Screen name="search" component={SearchScreen} />
            <Tab.Screen name="profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}
