import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import stylesheet from './styles/app.css?url';

export function links() {
  return [
    { rel: 'stylesheet', href: stylesheet },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700;800;900&display=swap',
    },
  ];
}

export function meta() {
  return [
    { title: '20g by NutriNomNom — 20g Protein in Every Serving' },
    {
      name: 'description',
      content:
        'Protein-packed gunpowder podi and oatmeal mix — made for Indian diets. 20 grams of protein in every single serving. Clean ingredients, real flavours.',
    },
  ];
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }) {
  return (
    <html>
      <head>
        <title>Something went wrong</title>
        <Meta />
        <Links />
      </head>
      <body style={{ fontFamily: 'Jost, sans-serif', padding: '4rem 2rem', textAlign: 'center' }}>
        <h1 style={{ fontWeight: 900, fontSize: '2rem', color: '#1A5C35' }}>Oops.</h1>
        <p>Something went wrong. <a href="/" style={{ color: '#1A5C35' }}>Go home →</a></p>
        <Scripts />
      </body>
    </html>
  );
}
