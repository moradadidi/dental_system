# Dental Care App - Laravel + React Starter Kit

## Introduction

The **Dental Care App** is a modern web application designed to streamline dental appointment booking, patient management, and clinic operations. Built using **Laravel** as the backend and **React** (with Inertia.js) as the frontend, this app provides a seamless user experience for both patients and dental professionals.

This system leverages:
- **Laravel** for robust backend logic and API handling.
- **React 19 + Inertia** for a smooth, single-page application experience.
- **Tailwind CSS** for modern and responsive UI styling.
- **shadcn/ui & radix-ui** for pre-built, customizable UI components.
- **Vite** for fast frontend asset compilation.

## Features
- **Appointment Scheduling**: Patients can book appointments with available dentists.
- **Patient & Dentist Management**: Secure authentication and role-based access for patients and dentists.
- **Real-Time Notifications**: Stay informed with appointment reminders and status updates.
- **Secure Authentication**: Laravel's built-in authentication with Inertia.js handling front-end authentication flow.
- **Admin Dashboard**: Manage appointments, users, and settings efficiently.

## Getting Started

### Prerequisites
Ensure you have the following installed:
- PHP 8.2+
- Composer
- Node.js 18+
- NPM/Yarn
- MySQL/PostgreSQL

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/dental-care-app.git
   cd dental-care-app
   ```
2. Install backend dependencies:
   ```sh
   composer install
   ```
3. Set up environment variables:
   ```sh
   cp .env.example .env
   ```
   Then configure your database credentials.
4. Run migrations:
   ```sh
   php artisan migrate --seed
   ```
5. Install frontend dependencies:
   ```sh
   npm install
   ```
6. Build assets & start the development server:
   ```sh
   npm run dev
   composer run dev
   ```

## Official Documentation

For more details on Laravel and React with Inertia.js, refer to:
- [Laravel Docs](https://laravel.com/docs)
- [Inertia.js Docs](https://inertiajs.com)
- [React Docs](https://react.dev)

## Contributing

We welcome contributions! Please check the [Laravel contribution guide](https://laravel.com/docs/contributions) before submitting pull requests.

## Code of Conduct

To ensure an inclusive and professional environment, please abide by the [Laravel Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## License

The **Dental Care App** is open-source software licensed under the **MIT License**.

