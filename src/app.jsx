// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// // import Dropdown from 'react-bootstrap/Dropdown';
// // import DropdownButton from 'react-bootstrap/DropdownButton';
// // import  Nav  from 'react-bootstrap/Nav'; 
// // import  NavDropdown from 'react-bootstrap/NavDropdown';
// // import  Navbar  from 'react-bootstrap/Navbar';
// import {
//   Navbar,
//   Nav,
//   NavDropdown,
//   Container,
//   Dropdown,
//   DropdownButton,
//   Button,
// } from 'react-bootstrap';
// import './app.css';

// import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
// import { Account } from './account/account';
// import { Asia } from './asia/asia';
// import { Europe } from './europe/europe';
// import { NorthAmerica } from './northAmerica/northAmerica';
// import { World } from './world/world';
// import { Home } from './home/home';
// import { AuthState } from './account/authState';
// // import { Button } from 'react-bootstrap';

// export default function App() {
//     const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
//   const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
//   const [authState, setAuthState] = React.useState(currentAuthState);
//   return ( 
//   <BrowserRouter>
//         <header>
//         <nav className="menu">
//         <div className="title-logo">
//          <NavLink to="/" style= {{ textDecoration: 'none' }} className="title"><h1>Soups Galore </h1></NavLink>
//         </div>
//          <div className="menu_links">
//              <ul className="menu_links-list">
//             <li><NavLink to="/" className="home">Home</NavLink></li>
//             <li className="custom-dropdown">
//             <NavDropdown id="dropdown-basic-button" title="World" className="dropdown">
//                 <NavDropdown.Item className="item">
//                 <NavDropdown.Item as={NavLink} to="/world">Overview</NavDropdown.Item>
//                 <NavDropdown.Item as={NavLink} to="/asia">Asia</NavDropdown.Item>
//                 <NavDropdown.Item as={NavLink} to="/northAmerica">North America</NavDropdown.Item>
//                 <NavDropdown.Item as={NavLink} to="/europe">Europe</NavDropdown.Item>
//                 </NavDropdown.Item>
//             </NavDropdown>
//              </li>
//             <li style={{ float: 'right' }}><NavLink className="account" to="account">Account</NavLink></li>
//             </ul>
//          </div>
//         </nav>
//     </header>


//     <Routes>
//     <Route path='/' element={<Home />} exact />
//     {/* <Route path='/account' element={<Account />} /> */}
//     <Route path='/asia' element={<Asia />} />
//     <Route path='/europe' element={<Europe />} />
//     <Route path='/northAmerica' element={<NorthAmerica />} />
//     <Route path='/world' element={<World />} />
//     {/* <Route path='/home' element={<Home />} /> */}
//     <Route path='*' element={<NotFound />} />
//     <Route
//         path='/account'
//         element={
//           <Account
//             userName={userName}
//             authState={authState}
//             onAuthChange={(userName, authState) => {
//               setAuthState(authState);
//               setUserName(userName);
//             }}
//           />
//         }
//       />
//     </Routes>

//     <div className="footer" style={{textAlign: 'center'}}>
//         <footer>
//         {/* <h1>3RD PARTY API PLACEHOLDER</h1> */}
//             <a href="https://github.com/anthonyphasay/startup" target="_blank"><h2>Github.com</h2></a>
//         <p>© 2025 Tony Phasay @ Soups Galore</p>
//         </footer>
//     </div>
//     {/* </div> */}
//     </BrowserRouter>
//     );
// }

// function NotFound() {
//   return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
// }
// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import {
//   Navbar,
//   Nav,
//   NavDropdown,
//   Container,
//   Dropdown,
//   DropdownButton,
//   Button,
// } from 'react-bootstrap';
// import './app.css';

// import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
// import { Account } from './account/account';
// import { Asia } from './asia/asia';
// import { Europe } from './europe/europe';
// import { NorthAmerica } from './northAmerica/northAmerica';
// import { World } from './world/world';
// import { Home } from './home/home';
// import { Favorite } from './favorite/favorite';
// import { AuthState } from './account/authState';

// export default function App() {
//   const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
//   const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
//   const [authState, setAuthState] = React.useState(currentAuthState);

//   // Sync localStorage changes with state
//   React.useEffect(() => {
//     const storedUserName = localStorage.getItem('userName');
//     if (storedUserName && !userName) {
//       setUserName(storedUserName);
//       setAuthState(AuthState.Authenticated);
//     } else if (!storedUserName && userName) {
//       setUserName('');
//       setAuthState(AuthState.Unauthenticated);
//     }
//   }, [userName]);

//   const handleAuthChange = (newUserName, newAuthState) => {
//     setAuthState(newAuthState);
//     setUserName(newUserName);
    
//     // Update localStorage based on auth state
//     if (newAuthState === AuthState.Authenticated) {
//       localStorage.setItem('userName', newUserName);
//     } else {
//       localStorage.removeItem('userName');
//     }
//   };

//   return ( 
//     <BrowserRouter>
//       <header>
//         <nav className="menu">
//           <div className="title-logo">
//             <NavLink to="/" style={{ textDecoration: 'none' }} className="title">
//               <h1>Soups Galore</h1>
//             </NavLink>
//           </div>
//           <div className="menu_links">
//             <ul className="menu_links-list">
//               <li><NavLink to="/" className="home">Home</NavLink></li>
//               <li className="custom-dropdown">
//                 <NavDropdown id="dropdown-basic-button" title="World" className="dropdown">
//                   <NavDropdown.Item as={NavLink} to="/world">Overview</NavDropdown.Item>
//                   <NavDropdown.Item as={NavLink} to="/asia">Asia</NavDropdown.Item>
//                   <NavDropdown.Item as={NavLink} to="/northAmerica">North America</NavDropdown.Item>
//                   <NavDropdown.Item as={NavLink} to="/europe">Europe</NavDropdown.Item>
//                 </NavDropdown>
//               </li>
//               <li><NavLink to="/favorites" className="favorites">Favorites</NavLink></li>
//               <li style={{ float: 'right' }}>
//                 <NavLink className="account" to="/account">
//                   {authState === AuthState.Authenticated ? userName : 'Account'}
//                 </NavLink>
//               </li>
//             </ul>
//           </div>
//         </nav>
//       </header>

//       <Routes>
//         <Route path='/' element={<Home />} exact />
//         <Route
//           path='/account'
//           element={
//             <Account
//               userName={userName}
//               authState={authState}
//               onAuthChange={handleAuthChange}
//             />
//           }
//         />
//         <Route path='/favorites' element={<Favorite />} />
//         <Route path='/asia' element={<Asia />} />
//         <Route path='/europe' element={<Europe />} />
//         <Route path='/northAmerica' element={<NorthAmerica />} />
//         <Route path='/world' element={<World />} />
//         <Route path='*' element={<NotFound />} />
//       </Routes>

//       <div className="footer" style={{ textAlign: 'center' }}>
//         <footer>
//           <a href="https://github.com/anthonyphasay/startup" target="_blank" rel="noopener noreferrer">
//             <h2>Github.com</h2>
//           </a>
//           <p>© 2025 Tony Phasay @ Soups Galore</p>
//         </footer>
//       </div>
//     </BrowserRouter>
//   );
// }

// function NotFound() {
//   return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
// }

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Dropdown,
  DropdownButton,
  Button,
} from 'react-bootstrap';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Account } from './account/account';
import { Asia } from './asia/asia';
import { Europe } from './europe/europe';
import { NorthAmerica } from './northAmerica/northAmerica';
import { World } from './world/world';
import { Home } from './home/home';
import { Favorite } from './favorite/favorite';
import { AuthState } from './account/authState';

export default function App() {
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);

  // Sync localStorage changes with state
  React.useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName && !userName) {
      setUserName(storedUserName);
      setAuthState(AuthState.Authenticated);
    } else if (!storedUserName && userName) {
      setUserName('');
      setAuthState(AuthState.Unauthenticated);
    }
  }, [userName]);

  const handleAuthChange = (newUserName, newAuthState) => {
    setAuthState(newAuthState);
    setUserName(newUserName);
    
    // Update localStorage based on auth state
    if (newAuthState === AuthState.Authenticated) {
      localStorage.setItem('userName', newUserName);
    } else {
      localStorage.removeItem('userName');
    }
  };

  return ( 
    <BrowserRouter>
      <header>
        <nav className="menu">
          <div className="title-logo">
            <NavLink to="/" style={{ textDecoration: 'none' }} className="title">
              <h1>Soups Galore</h1>
            </NavLink>
          </div>
          <div className="menu_links">
            <ul className="menu_links-list">
              <li><NavLink to="/" className="home">Home</NavLink></li>
              <li className="custom-dropdown">
                <NavDropdown id="dropdown-basic-button" title="World" className="dropdown">
                  <NavDropdown.Item as={NavLink} to="/world">Overview</NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/asia">Asia</NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/northAmerica">North America</NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/europe">Europe</NavDropdown.Item>
                </NavDropdown>
              </li>
              <li><NavLink to="/favorites" className="favorites">Favorites</NavLink></li>
              <li style={{ float: 'right' }}>
                <NavLink className="account" to="/account">
                  {authState === AuthState.Authenticated ? userName : 'Account'}
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <Routes>
        <Route path='/' element={<Home />} exact />
        <Route
          path='/account'
          element={
            <Account
              userName={userName}
              authState={authState}
              onAuthChange={handleAuthChange}
            />
          }
        />
        <Route path='/favorites' element={<Favorite />} />
        <Route path='/asia' element={<Asia />} />
        <Route path='/europe' element={<Europe />} />
        <Route path='/northAmerica' element={<NorthAmerica />} />
        <Route path='/world' element={<World />} />
        <Route path='*' element={<NotFound />} />
      </Routes>

      <div className="footer" style={{ textAlign: 'center' }}>
        <footer>
          <a href="https://github.com/anthonyphasay/startup" target="_blank" rel="noopener noreferrer">
            <h2>Github.com</h2>
          </a>
          <p>© 2025 Tony Phasay @ Soups Galore</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}