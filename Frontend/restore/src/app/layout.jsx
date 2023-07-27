import './globals.css';
import Provider from './components/Provider/Provider';
import Footer from './components/footer/footer';
export const metadata = {
  title: 'ReStore',
  description: 'Encuentra los mejores productos en nuestro sitio!',
  keywords: 'ecommerce, tienda en línea, productos, compras',
  icons: {
    icon: ['/favicon.ico?v=4'],
    apple: ['/apple-touch-icon.png?v=4'],
    shortcut: ['/apple-touch-icon.png'],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }) {
  return (
    <html
      style={{ background: 'rgb(241 245 249)' }}
      className='bg-slate-100 text-slate-800 font-sans'
    >
      <head></head>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
