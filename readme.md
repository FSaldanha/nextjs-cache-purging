# Update

**In February 2022, Next.js released a built-in [On-demand Incremental Static Regeneration](https://nextjs.org/blog/next-12-1#on-demand-incremental-static-regeneration-beta) in beta stage. This new solution likely makes this project obsolete.**

# Next.js Cache Purging

## Introduction

When you use `getStaticProps` in a page, Next.js does [Automatic Static Optimization](https://nextjs.org/docs/advanced-features/automatic-static-optimization) by prerendering it to static HTML. 

This occurs for static or static generated pages which have routers predefined with `getStaticPaths` (at build time), incremental static generated pages with [fallback configuration](https://nextjs.org/docs/basic-features/data-fetching#the-fallback-key-required) (at first request) or [incremental static regenerated](https://nextjs.org/docs/basic-features/data-fetching#incremental-static-regeneration) pages with a `revalidate` parameter defined (in the background, after first request when page is stale).

In the prerendering process, Next.js emits HTML and JSON files and saves it by default in `.next/server/pages` directory. Besides, content is cached using a slighty modified version of [LRU Cache](https://www.npmjs.com/package/lru-cache).

Until this moment (February 2021), Next.js does **not** have a native feature for invalidating cache on demand, which could be used with an API for triggering content update without having to rebuild the application, although maintainers had already demonstrated interest in implementing it (see [here](https://github.com/vercel/next.js/discussions/11552#discussioncomment-2655) and [here](https://github.com/vercel/next.js/discussions/10721#discussioncomment-686)).

## Possible solution

By setting a [custom server](https://nextjs.org/docs/advanced-features/custom-server) (see `server.js` in this repo), it's possible to ask Next.js to delete prerendering files and purging LRU Cache for a specific URL, by justing appending the parameter `purge=1` to it. This appears to preserve Automatic Static Optimization, even though documentation states the opposite.

## Caveats

- Experimental code! Do not use it in production.
- It cannot be deployed to Vercel.
