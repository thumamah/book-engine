import React from 'react';
import Navbar from './components/Navbar';
import Head from './components/Head';
import Footer from './components/Footer'

// home page which has the navbar, head and footer component
export default function Home() {
  return (
    <div>
      <Navbar />
      <Head />
      <Footer />
    </div>
  )
}
