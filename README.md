# HOOP News

Website for reading articles.

## Installation

- Configure .env.local file

```
  BASE_URL=
  REDIS_URL=
  REDIS_PASS=
```

Consider using redis cloud since it's the easiest and quickest solution.

- Run these commands

```
yarn
yarn dev
```

## Handling CORs

I couldn't hit the Api due to browser cors restriction, so I decided to bypass that using Nextjs rewrites.

```
// next.config.js

 async rewrites() {
   return [
     {
       source: '/api/login',
       destination: 'http://34.245.213.76:3000/auth/signin' // Proxy to Backend
     },
```

Nextjs would act as an http proxy server, make queries and mutations then send it to the browser. Bypassing cors restrictions.

## Handling Authentication

Caching tokens in browser local storage would be insecure and caching it in redux would resolve to null after reloading the page resulting in bad user experience.

So, I decided to cache it in redis (a memory based database) on a separate server. The user could fetch that token whenever needed as long as it's still in cache.

[redis image here]

## Stack

- Typescript
- Nextjs
- Redux
- Chakra
- react-query and axios

## Hooking up the api

Using Axios to handle http requests and react-query to manage react in a modern way.

## Styling

Using chakra as the styling framework for this project. Greatest thing about it, is it's solid resuable components library and it's ability to implement consistent theming. Very quick!
