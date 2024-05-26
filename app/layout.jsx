import '@/assets/styles/globals.css';
import AuthProvider from '@/components/AuthProvider';
import { Toaster } from 'react-hot-toast';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { GlobalProvider } from '@/context/GlobalContext';
import 'photoswipe/dist/photoswipe.css';
import '@/assets/styles/globals.css';

export const metadata = {
  title: 'DreamRental | Find The Perfect Rental',
  description: 'Find the perfect rental property in your area.',
  keywords: 'rental, find rental, find property, rental property',
};

const MainLayout = ({ children }) => {
  return (
    <GlobalProvider>
      <AuthProvider>
        <html lang="en">
          <body>
            <Navbar />
            <div>{children}</div>
            <Footer />
            <Toaster />
          </body>
        </html>
      </AuthProvider>
    </GlobalProvider>
  );
};
export default MainLayout;
