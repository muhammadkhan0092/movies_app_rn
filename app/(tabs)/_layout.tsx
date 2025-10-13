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
            <Tab.Screen name="Home" component={HomeScreen} options={{
                // 👇 Add background color here for this screen
                // if sceneContainerStyle not recognized
                tabBarStyle: { backgroundColor: "transparent" },
            }}/>
            <Tab.Screen name="Saved" component={SavedScreen} />
            <Tab.Screen name="Search" component={SearchScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}
