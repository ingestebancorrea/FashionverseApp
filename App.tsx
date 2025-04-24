import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Navigator } from './src/navigator/Navigator';
import { AuthProvider } from './src/context/auth/AuthContext';
import { ProductsProvider } from './src/context/landing/store/ProductsContextx';
import { PostsProvider } from './src/context/landing/store/PostsContext';

const AppState = ({ children }: any) => {
  return (
    <AuthProvider>
      <ProductsProvider>
        <PostsProvider>
          {children}
        </PostsProvider>
      </ProductsProvider>
    </AuthProvider>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <Navigator />
      </AppState>
    </NavigationContainer>
  );
};

export default App;
