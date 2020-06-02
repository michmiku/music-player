import React from 'react';
import Routes from "./Routes.js"
import AuthenticatedUserProvider from "./contexts/AuthenticatedUser.js";

function App() {

  return (
    <AuthenticatedUserProvider>
      <Routes />
    </AuthenticatedUserProvider>

  );
}

export default App;
