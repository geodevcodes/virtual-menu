<div align="center">
<h1>Virtual Menu Application</h1>
<h6><i>Manage your Guest with Virtual Menu</i></h6>
<hr />
</div>

Virtual Menu is a smart digital menu management platform built for restaurants, hotels, lounges, spas, and hospitality businesses. It enables businesses to upload and manage food, drink, spa, and accommodation menus while providing customers with seamless QR-code access to menus from any device.

Built with scalability, performance, and maintainability in mind, the server delivers a reliable foundation for seamless digital menu management and modern contactless customer experiences, and an intuitive interface for both businesses and customers.

# 🏗️ Tech Stack

- **Framework**: [Next.js 15.5.4](https://nextjs.org/) with App Router
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **React TanStack Query**: [React Tanstack Query](https://tanstack.com/query/latest)
- **Framer Motion**: [Framer Motion](https://motion.dev/docs)
- **React-Hook Form**: [Redux Hook Form](https://react-hook-form.com)
- **React-Redux**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Database**: [Mongodb Database](https://account.mongodb.com/) [Prisma ORM](https://www.prisma.io/)

# 🎯 Prototype

![Minion](public/opengraph-image.png)

# 🚀 How to Contribute

### 1. Clone the Repository

```bash
git clone https://github.com/geodevcodes/virtual-menu.git
cd virtual-menu
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the project root:

```env
# Site Information (Optional)
NEXT_PUBLIC_API_BASE_URL=https://virtual-menu-server.vercel.app/api/v1 (staging)
NEXT_PUBLIC_APP_URL=https://virtual-menu-bay.vercel.app
NEXT_PUBLIC_ENVIRONMENT=development
NODE_ENV="development"
```

### 4. Start Development Server

```bash
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application running!

# Deployment

- [GODADDY](https://www.godaddy.com/)
  :Used for domain registration and DNS management, providing a reliable foundation for custom domain configuration.
- [PM2](https://pm2.keymetrics.io/)
  :Used as a process manager for running and monitoring the Node.js backend, enabling zero-downtime restarts and enhanced stability.
- [DOCKER](https://www.docker.com/)
  :Used for containerizing the application, ensuring consistent environments across development, staging, and production deployments.
- [NGINX](https://nginx.org/)
  :Used as a reverse proxy and load balancer, managing HTTP requests, SSL termination, and optimizing performance for both frontend and backend services.

# License

The MIT License - Copyright (c) 2026 - Present, geodevcodes / Storage Service.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) for Frontend
- [NestJs](https://nestjs.com/) for backend services
- [Tailwind CSS](https://tailwindcss.com)
- [Lucide](https://lucide.dev) for icons

## Built by

- [Rasheed Olatunde](https://github.com/geodevcodes) (Software Developer)
