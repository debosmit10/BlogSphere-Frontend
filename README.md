# 🌐 BlogSphere Frontend

<div align="center">

[![React](https://img.shields.io/badge/React-19.0.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3.1-646CFF.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1.5-38B2AC.svg)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React%20Router-7.5.3-CA4245.svg)](https://reactrouter.com/)

<!-- [![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE) -->

**A modern, feature-rich frontend for the BlogSphere blogging platform**

<!-- [🚀 Demo](#) • [📖 Documentation](#) • [🐛 Report Bug](#) • [💡 Request Feature](#) -->

</div>

---

## 📋 Table of Contents

-   [🌟 Project Overview](#-project-overview)
-   [🛠️ Tech Stack](#️-tech-stack)
-   [⚡ Quick Start](#-quick-start)
-   [📱 Application Pages](#-application-pages)
-   [👥 Contributors](#-contributors)
-   [📈 Changelog](#-changelog)

---

## 🌟 Project Overview

**BlogSphere** is a comprehensive blogging platform that empowers writers and readers to connect, share ideas, and build communities around compelling content. The frontend is built with modern React technologies, providing a responsive, intuitive, and engaging user experience.

### ✨ Key Features

-   🔐 **Secure Authentication** - JWT-based user authentication and authorization
-   ✍️ **Blog Editor** - Create and edit blogs with an intuitive interface
-   🤖 **AI Text Enhancement** - Enhance blog content quality with intelligent AI-powered text improvement
-   💬 **Interactive Comments** - Engage with readers through comments and likes
-   👤 **User Profiles** - Customizable user profiles with follow/unfollow functionality
-   💾 **Save Blogs** - Bookmark favorite articles for later reading
-   🎯 **Topic-based Feed** - Discover content based on interests
-   ⚡ **Real-time Updates** - Dynamic content updates and notifications
-   👑 **Admin Dashboard** - Comprehensive administration panel

---

## 🛠️ Tech Stack

### Core Technologies

| Technology       | Version | Purpose                                         |
| ---------------- | ------- | ----------------------------------------------- |
| **React**        | 19.0.0  | Frontend framework for building user interfaces |
| **Vite**         | 6.3.1   | Next-generation frontend build tool             |
| **Tailwind CSS** | 4.1.5   | Utility-first CSS framework for styling         |
| **React Router** | 7.5.3   | Declarative routing for React applications      |

### State Management & Forms

| Library    | Version | Purpose                                        |
| ---------- | ------- | ---------------------------------------------- |
| **Formik** | 2.4.6   | Build forms with validation and error handling |
| **Yup**    | 1.6.1   | Schema validation for form data                |

### HTTP & Authentication

| Library        | Version | Purpose                                    |
| -------------- | ------- | ------------------------------------------ |
| **Axios**      | 1.9.0   | Promise-based HTTP client for API requests |
| **JWT Decode** | 4.0.0   | Decode JWT tokens for authentication       |
| **js-cookie**  | 3.0.5   | Simple API for handling cookies            |

<!-- ### UI Components & Icons
| Library | Version | Purpose |
|---------|---------|---------|
| **React Icons** | 5.5.0 | Popular icon library for React |
| **Hamburger React** | 2.5.2 | Animated hamburger menu icon |
| **React Circular Progressbar** | 2.2.0 | Circular progress indicators |
| **React Countdown** | 2.3.6 | Countdown timer components |

### Development Tools
| Tool | Version | Purpose |
|------|---------|---------|
| **ESLint** | 9.22.0 | Code linting and quality assurance |
| **@vitejs/plugin-react** | 4.3.4 | Vite plugin for React support | -->

---

## ⚡ Quick Start

### Prerequisites

Ensure you have the following installed on your system:

-   **Node.js** (v18.0.0 or higher)
-   **npm** (v8.0.0 or higher) or **yarn** (v1.22.0 or higher)

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/debosmit10/BlogSphere-Frontend.git
    cd BlogSphere-Frontend
    ```

1. **Install dependencies**

    ```bash
    npm install
    # or ₊ ⊹
    yarn install
    ```

1. **Start development server**

    ```bash
    npm run dev
    # or ⊹ ࣪ ˖
    yarn dev
    ```

1. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

<!-- ### Build for Production

```bash
npm run build
# or
yarn build
```

### Preview Production Build

```bash
npm run preview
# or
yarn preview
``` -->

---

## 📱 Application Pages

| Page                | Route              | Description                                  | Authentication | Screenshot                              |
| ------------------- | ------------------ | -------------------------------------------- | -------------- | --------------------------------------- |
| **Landing Page**    | `/`                | Welcome page with platform introduction      | Public         | ![Landing](screenshots/landing.png)     |
| **Authentication**  | `/authentication`  | Login and registration forms                 | Public         | ![Auth](screenshots/authentication.png) |
| **Home Feed**       | `/home`            | Main dashboard with personalized blog feed   | Protected      | ![Home](screenshots/home.png)           |
| **Blog Reader**     | `/blog/:id`        | Individual blog post with comments           | Protected      | ![Blog](screenshots/blog.png)           |
| **Write Blog**      | `/write`           | Rich text editor for creating new blogs      | Protected      | ![Write](screenshots/write.png)         |
| **Edit Blog**       | `/edit/:id`        | Edit existing blog posts                     | Protected      | ![Edit](screenshots/edit.png)           |
| **User Profile**    | `/profile/:userId` | User profile with blogs and followers        | Protected      | ![Profile](screenshots/profile.png)     |
| **Admin Dashboard** | `/admin/dashboard` | Administrative panel for platform management | Admin Only     | ![Admin](screenshots/admin.png)         |
| **About Us**        | `/about`           | Information about the platform               | Public         | ![About](screenshots/about.png)         |
| **Contact**         | `/contact`         | Contact form and support information         | Public         | ![Contact](screenshots/contact.png)     |

### 🎨 UI Components

-   **Navigation**: Responsive header with authentication state awareness
-   **Sidebar**: Dynamic navigation with user-specific options
-   **Blog Cards**: Interactive cards with like, save, and share functionality
-   **Comment System**: Threaded comments with real-time updates
-   **Search**: Global search with autocomplete functionality
-   **Modals**: Modal dialogs for various actions

---

## 👥 Contributors

<div align="center">

### 🏆 Project Team

| Avatar                                                                                          | Name                  | Role           | GitHub                                       |
| ----------------------------------------------------------------------------------------------- | --------------------- | -------------- | -------------------------------------------- |
| <img src="https://github.com/debosmit10.png" width="50" height="50" style="border-radius: 50%"> | **Debosmit Karmakar** | Lead Developer | [@debosmit10](https://github.com/debosmit10) |
| <img src="https://github.com/Somik-11.png" width="50" height="50" style="border-radius: 50%">   | **Somik Acharjee**    | UI/UX Designer | [@Somik-11](https://github.com/Somik-11)     |
| <img src="https://github.com/Rahul69-69.png" width="50" height="50" style="border-radius: 50%"> | **Rahul Adhya**       | UI/UX Designer | [@Rahul69-69](https://github.com/Rahul69-69) |

</div>

### 🤝 How to Contribute

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📈 Changelog

### 📊 Version History

| Version    | Release Date | Description |
| ---------- | ------------ | ----------- |
| **v1.0.1** | 27-6-2025    | Bugfixes    |
| **v1.0.0** | 18-6-2025    | Release     |

<details>
<summary><strong>📋 Read More - Detailed Changelog</strong></summary>

<!-- #### 🧪 v0.0.0 (00-00-2025)

- **🎯 New Features**
   - ✅ Blog saving/bookmarking functionality

- **🔄 Improvements**
   - ✅ Enhanced UI/UX with better animations

- **🐛 Fixes**
   - ✅ Resolved memory leaks in components

--- -->

#### 🚀 v1.0.1 (27-6-2025)

-   **🐛 Fixes**
    -   Fixed blog writing page to redirect user to the published blog page after submitting.
    -   Minor UI Fixes

---

#### 🚀 v1.0.0 (18-6-2025)

-   **🎉 Major Features**
    -   ✅ Complete authentication system with JWT integration
    -   ✅ Full CRUD operations for blog management
    -   ✅ Interactive comment system with likes and replies
    -   ✅ User profile management with follow/unfollow functionality
    -   ✅ Advanced blog feed with topic-based filtering
    -   ✅ Responsive design optimized for all devices
    -   ✅ Admin dashboard with comprehensive management tools

</details>

---

<div align="center">

### 🌟 Star this repository if you found it helpful!

**Made with ❤️ by the BlogSphere Team**

[⬆ Back to Top](#-blogsphere-frontend)

</div>
