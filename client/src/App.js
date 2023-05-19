import React, { useRef, useEffect } from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router } from 'react-router-dom';
import Hamburger from './components/Hamburger';
import PlantButton from './components/PlantButton';
import Footer from './components/Footer';
import ScrollTop from "./components/ScrollTop";
import AnimatedRoutes from './components/AnimatedRoutes';
import useWindowSize from './hooks/useWindowSize';
import AnimatedLogRoutes from './components/AnimatedLogRoutes';
import "./pages/styles.css"
const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
   //Hook to grab window size
 const size = useWindowSize();
 // Ref for parent div and scrolling div
 const app = useRef();
 const scrollContainer = useRef();
 // Configs
 const data = {
     ease: 0.1,
     current: 0,
     previous: 0,
     rounded: 0
 };
 // Run scrollrender once page is loaded.
 useEffect(() => {
     requestAnimationFrame(() => skewScrolling());
 }, []);
 //set the height of the body.
 useEffect(() => {
     setBodyHeight();
 }, [size.height]);
 //Set the height of the body to the height of the scrolling div
 const setBodyHeight = () => {
     document.body.style.height = `${scrollContainer.current.getBoundingClientRect().height
         }px`;
 };
 // Scrolling
 const skewScrolling = () => {
     //Set Current to the scroll position amount
     data.current = window.scrollY;
     // Set Previous to the scroll previous position
     data.previous += (data.current - data.previous) * data.ease;
     // Set rounded to
     data.rounded = Math.round(data.previous * 100) / 100;
     // Difference between
     const difference = data.current - data.rounded;
     const acceleration = difference / size.width;
     const velocity = +acceleration;
     const skew = velocity * .5;
     //Assign skew and smooth scrolling to the scroll container
     scrollContainer.current.style.transform = `translate3d(0, -${data.rounded}px, 0) skewY(${skew}deg)`;
     //loop vai raf
     requestAnimationFrame(() => skewScrolling());
 };
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <ScrollTop />
          <AnimatedLogRoutes/>
          <main className=''>
          <section className="grid grid-cols-3 z-50 fixed h-[7rem] px-2 py-1 bg-[#ffd6a3]">
            <div className="grid items-center w-screen -mt-4 z-40">
              <Hamburger />
            </div>
            <div className='grid font-spring text-[6rem] text-center mr-2 -mb-10'>
              Swap & Sow
              </div>
            <div className="grid items-center justify-end lg:-mr-[8rem] text-end z-50">
              <PlantButton />
            </div>
            
          </section>
          
          <div ref={app} className="h-[100%] bg-hp bg-fixed">
            <div ref={scrollContainer} className="scroll h-[100%]">
              <AnimatedRoutes />
              <div>
              <Footer />
              </div>
            </div>
          </div>
          </main>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;

//make seperate animated routes for login & signup