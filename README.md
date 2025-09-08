# SaaS App - LMS with Next.js, Supabase & Payments

## 📋 Table of Contents

1. 🤖 Introduction
2. ⚙️ Tech Stack
3. 🔋 Features
4. 🤸 Quick Start
5. 🚀 More
6. 🔗 Topics

## 🤖 Introduction

Create an LMS SaaS app from scratch featuring user authentication, subscriptions, and payments using Next.js, Supabase, and Stripe! You'll build and deploy a real-time teaching platform with Vapi, integrate an AI vocal agent, and deliver seamless, interactive learning sessions.

## ⚙️ Tech Stack

- **Clerk** is a unified platform for authentication, user management, and billing. It offers embeddable UI components, flexible APIs, and admin dashboards for secure user management. Clerk also simplifies subscription management, allowing you to define plans, create pricing pages, and control access based on subscription tiers—all in one solution.
- **Next.js** is a powerful React framework that enables the development of fast, scalable web applications with features like server-side rendering, static site generation, and API routes for building full-stack applications.
- **Sentry** is an error tracking and performance monitoring tool that helps developers fix bugs faster by providing real-time alerts, stack traces, and performance insights.
- **shadcn/ui** is a customizable component library built on Radix UI and Tailwind CSS. It offers a modern, accessible design system with pre-built components that are easy to theme and extend, making it ideal for building polished UIs with minimal effort.
- **Supabase** is an open-source backend-as-a-service platform that provides instant APIs, real-time subscriptions, authentication, storage, and a PostgreSQL database, enabling developers to build scalable and secure applications with ease.
- **Tailwind CSS** is a utility-first CSS framework that allows developers to design custom user interfaces by applying low-level utility classes directly in HTML, streamlining the design process.
- **TypeScript** is a superset of JavaScript that adds static typing, providing better tooling, code quality, and error detection for developers, making it ideal for building large-scale applications.
- **Vapi** is a developer-centric voice AI platform that enables the creation of conversational voice agents with low-latency voice interactions, speech-to-text, and text-to-speech capabilities. It supports multilingual conversations, customizable voices, and seamless integration with various AI models and tools.
- **Zod** is a TypeScript-first schema validation library that provides a simple and expressive way to define and validate data structures. Zod ensures data integrity by catching errors early during development.

## 🔋 Features

👉 **AI Voice Agents**: Take tutoring sessions with voiced AIs specializing in the topics you want to get better at.

👉 **Authentication**: Secure user sign-up and sign-in with Clerk; Google authentication and many more.

👉 **Billing & Subscriptions**: Easily manage plans, upgrades, and payment details.

👉 **Bookmarks and Session History**: Let users organise their learning by bookmarking tutors and accessing previous sessions.

👉 **Code Reusability**: Leverage reusable components and a modular codebase for efficient development.

👉 **Create a Tutor**: Create your own AI tutors, choosing a subject, topic, and style of conversation.

👉 **Cross-Device Compatibility**: Fully responsive design that works seamlessly across all devices.

👉 **Database Integration**: Uses Supabase for real-time data handling and storage needs.

👉 **Modern UI/UX**: Clean, responsive design built with Tailwind CSS and shadcn/ui for a sleek user experience.

👉 **Scalable Tech Stack**: Built with Next.js for a fast, production-ready web application that scales seamlessly.

👉 **Search Functionality**: Find tutors quickly with robust filters and search bar.

and many more, including code architecture and reusability.

## 🤸 Quick Start

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- Git
- Node.js
- npm (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/Programmer-DN-AI/lms-saas-app.git
cd lms-saas-app
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env.local` in the root of your project and add the following content:

```bash
# Sentry
SENTRY_AUTH_TOKEN=

# Vapi
NEXT_PUBLIC_VAPI_WEB_TOKEN=

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Replace the placeholder values with your actual credentials. You can obtain these credentials by signing up on: Supabase, Clerk, Sentry, Vapi.

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

## 🔗 Assets

Assets and snippets used in the project can be found in the **repo**.

## 🚀 More

LMS SaaS app featuring user authentication, subscriptions, and payments using Next.js, Supabase, and Stripe — also integrates Vapi AI voice agent for seamless, interactive learning sessions.

### 🔗 Topics

typescript stripe sentry nextjs vapi tailwind tailwindcss supabase clerk shadcn-ui shadcn nextjs15 vapi-ai
