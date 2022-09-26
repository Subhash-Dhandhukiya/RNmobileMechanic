import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import App from './App';
import Register from './Architecture/Views/Register';
import ForgotPassword from './Architecture/Views/ForgotPassword';
import ChangePassword from './Architecture/Views/ChangePassword';
import Home from './Architecture/Views/Home';
import Favourite from './Architecture/Views/Client/Favourites';
import Profile from './Architecture/Views/Client/Profile';
import VehicleNeeds from './Architecture/Views/Client/VehicleNeeds';
import VehicleNeedAdd from './Architecture/Views/Client/VehicleNeedAdd';
import MechanicsProfileList from './Architecture/Views/Client/MechanicsProfileList';
import CalenderScreen from './Architecture/Views/Client/CalenderScreen';
import WorksDashboard from './Architecture/Views/Client/WorksDashboard';
import AddAddress from './Architecture/Views/Client/AddAddress';
import Scheduled from './Architecture/Views/Client/Scheduled';
import EditAccount from './Architecture/Views/Client/EditAccount';
import HelpRequest from './Architecture/Views/Client/HelpRequest';
import EditHelpRequest from './Architecture/Views/Client/EditHelpRequest';
import UpdateSkills from './Architecture/Views/Client/UpdateSkills';
// import Test from './Architecture/Views/Client/Test';
import MechanicDetailProfile from './Architecture/Views/Client/MechanicDetailProfile';
import GetQuotation from './Architecture/Views/Mechanic/GetQuotation';
import GenerateQuotation from './Architecture/Views/Mechanic/GenerateQuotation';
import SplashScreen from './SplashScreen';
import ClientQuotations from './Architecture/Views/Client/ClientQuotations';
import VehiclesList from './Architecture/Views/Client/VehiclesList';
import Test from './Architecture/Views/Client/Test';
import BookAppointment from './Architecture/Views/Client/BookAppointment';
import BookQuotation from './Architecture/Views/Client/BookQuotation';
import EditAddress from './Architecture/Views/Client/EditAddress';
import EditVehicle from './Architecture/Views/Client/EditVehicle';
import EditProfileVehicle from './Architecture/Views/Client/EditProfileVehicle';
import SelfDescription from './Architecture/Views/Client/SelfDescription';
import ScheduledDetails from './Architecture/Views/Client/ScheduledDetails';
import CloseJobs from './Architecture/Views/Client/CloseJob';
// import Notifications from './Architecture/Views/Notifications';
import ScheduledJobDetails from './Architecture/Views/Client/ScheduledJobDetails'



const AppStack = createStackNavigator();
export default function Navigator(){

    return (
    <NavigationContainer>
    <AppStack.Navigator screenOptions={{ headerShown: false }} >
 
    <AppStack.Screen name="SplashScreen" component={SplashScreen} />
    
    <AppStack.Screen name="App" component={App} />


    <AppStack.Screen name="Register" component={Register} />
    <AppStack.Screen name="ForgotPassword" component={ForgotPassword} />
    <AppStack.Screen name="ChangePassword" component={ChangePassword}/>
    <AppStack.Screen name="Home" component={Home} />
    <AppStack.Screen name="Favourite" component={Favourite} />
    <AppStack.Screen name="Profile" component={Profile} />
    <AppStack.Screen name="AddAddress" component={AddAddress} />
    <AppStack.Screen name="VehicleNeeds" component={VehicleNeeds} />
    <AppStack.Screen name="VehicleNeedAdd" component={VehicleNeedAdd} />
    <AppStack.Screen name="MechanicsProfileList" component={MechanicsProfileList} />
    <AppStack.Screen name="CalenderScreen" component={CalenderScreen} />
    <AppStack.Screen name="WorksDashboard" component={WorksDashboard} />
    <AppStack.Screen name="Scheduled" component={Scheduled} />
    <AppStack.Screen name="EditAccount" component={EditAccount} />
    <AppStack.Screen name="HelpRequest" component={HelpRequest} />
    <AppStack.Screen name="EditHelpRequest" component={EditHelpRequest} />
    <AppStack.Screen name="UpdateSkills" component={UpdateSkills} />
    <AppStack.Screen name="MechanicDetailProfile" component={MechanicDetailProfile} />
    <AppStack.Screen name="GetQuotation" component={GetQuotation} />
    <AppStack.Screen name="GenerateQuotation" component={GenerateQuotation} />
    <AppStack.Screen name="ClientQuotations" component={ClientQuotations} />
    <AppStack.Screen name="VehiclesList" component={VehiclesList} />
    <AppStack.Screen name="BookAppointment" component={BookAppointment} />
    <AppStack.Screen name="BookQuotation" component={BookQuotation} />
    <AppStack.Screen name="EditAddress" component={EditAddress} />
    <AppStack.Screen name="EditVehicle" component={EditVehicle} />
    <AppStack.Screen name="EditProfileVehicle" component={EditProfileVehicle} />
    <AppStack.Screen name="SelfDescription" component={SelfDescription} />
    <AppStack.Screen name="ScheduledDetails" component={ScheduledDetails} />
    <AppStack.Screen name="CloseJobs" component={CloseJobs} />
    <AppStack.Screen name="ScheduledJobDetails" component={ScheduledJobDetails} />
    {/* <AppStack.Screen name="Notifications" component={Notifications} /> */}
    {/* <AppStack.Screen name="Test" component={Test} /> */}
    </AppStack.Navigator>
    </NavigationContainer>
    );
}