import React, { useState, useEffect } from 'react';
import Navbar from '../../Navbar';
import Shortlist from '../Shortlist';
import Terms from "../Terms/Terms";
import Footer from "../Footer/Footer";
import Card from '../Cards/Card';
import {auth} from '../../firebase'
import Loading from '../Cards/Loading';


function Home(){
  const [userName, setUserName] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
      } else setUserName("");
    });
  }, []);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }, []);
  
    return (
      <>
        <Navbar name={userName} />
        <Shortlist />
        {loading?<Loading/>:<Card />}
        <Terms />
        <Footer/>
     </>
    )

}

export default Home