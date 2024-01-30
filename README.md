## Edge Runtime

### What is Edge Runtime?

- Edge Runtime involves processing requests and responses on servers that are physically closer to the client's location, significantly reducing latency and improving performance.

### Issues with Non-Edge Compatible Services (e.g., Prisma)

- If a service like Prisma does not support Edge Runtime, all requests involving it (such as database queries) must be routed to a central server. This can increase latency and potentially lead to server overloads.

### Advantage of JWT for Session Management

- Using a database for session management means each session-related interaction involves a database query, which can be inefficient without Edge Runtime support.
- JWT sessions optimize this by requiring database interaction only once during the initial login. Post-login, the JWT, which carries the session information, is validated locally, reducing the need for continuous database checks and leveraging the edge infrastructure.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
