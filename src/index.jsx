import React from 'react';
import ReactDOM from 'react-dom';

import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import NotFound from './pages/not-found';
import { fakeAuthProvider } from './api/fake-api/auth';
const Application = React.lazy(() => import('./pages/Application'));


let AuthContext = React.createContext();

function AuthProvider({ children }) {
  let [user, setUser] = React.useState(null);

  let signin = (newUser, callback) => {
    return fakeAuthProvider.signin(() => {
      setUser(newUser);
      callback();
    });
  };

  let signout = (callback) => {
    return fakeAuthProvider.signout(() => {
      setUser(null);
      callback();
    });
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return React.useContext(AuthContext);
}

console.log(ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" /* element={<GlobalHeader />} */ >

            <Route index element={
              <React.Suspense fallback={<>...</>}>
                <Application/>
              </React.Suspense>
            } />
            {/* <Route path="teams" element={<Application />}>
              <Route path=":teamId" element={<Application />} />
              <Route path="new" element={<Application />} />
              <Route index element={<Application />} />
            </Route> */}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
    {/* <Application /> */}
  </React.StrictMode>,
  document.getElementById('root')
)
)



// interface AuthContextType {
//   user: any;
//   signin: (user: string, callback: VoidFunction) => void;
//   signout: (callback: VoidFunction) => void;
// }


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
