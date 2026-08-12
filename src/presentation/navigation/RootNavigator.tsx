import { NavigationContainer } from "@react-navigation/native";

import { useAuth } from "@/presentation/context";

import AppNavigator from "./AppNavigator";
import LoginScreen from "@/presentation/screens/Login";

export default function RootNavigator() {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <AppNavigator />
      ) : (
        <LoginScreen />
      )}
    </NavigationContainer>
  );
}
