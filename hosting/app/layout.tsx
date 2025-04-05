// components/Layout.tsx
import Head from 'next/head';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Head>
        <title>Joey Russell | Software Developer</title>
        <meta name="description" content="Portfolio website of Joey Russell, Software Developer" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;