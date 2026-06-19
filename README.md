# 🚗 Cruiz

**Cruiz** is a modern, full-featured ride-hailing mobile app built with React Native and Expo. Book rides instantly, track your driver in real time, and manage everything from a beautiful, intuitive interface.

---

## ✨ Features

- 🛡️ **Secure Authentication** — Sign up & sign in with email/password or Google OAuth (powered by Clerk)
- 🗺️ **Real-Time Maps** — Live location tracking and interactive map-based ride booking
- 📍 **Smart Location Search** — Google Places autocomplete for origin & destination
- 💳 **In-App Payments** — Seamless ride payments powered by Stripe
- 🚘 **Driver Selection** — Browse and choose from nearby available drivers
- 📜 **Ride History** — View all past and upcoming rides
- 💬 **In-App Chat** — Message your driver directly
- 👤 **User Profile** — Manage your account details

---

## 🛠️ Tech Stack

| Technology                                                                  | Purpose                          |
| --------------------------------------------------------------------------- | -------------------------------- |
| [Expo SDK 56](https://expo.dev)                                             | Cross-platform mobile framework  |
| [Expo Router](https://expo.github.io/router)                                | File-based navigation            |
| [React Native](https://reactnative.dev)                                     | Core mobile UI                   |
| [NativeWind](https://www.nativewind.dev)                                    | Tailwind CSS for React Native    |
| [Clerk](https://clerk.com)                                                  | Authentication & user management |
| [Stripe](https://stripe.com)                                                | Payment processing               |
| [React Native Maps](https://github.com/react-native-maps/react-native-maps) | Map rendering                    |
| [Zustand](https://zustand-demo.pmnd.rs)                                     | Lightweight state management     |
| [TypeScript](https://www.typescriptlang.org)                                | Type safety                      |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) (v18+)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Expo Go](https://expo.dev/go) app on your device (or an emulator)

### Installation

```bash
# Clone the repository
git clone https://github.com/Rajommkar/cruiz.git
cd cruiz

# Install dependencies
npm install

# Start the development server
npm start
```

### Environment Variables

Create a `.env` file in the root directory:

```env
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
EXPO_PUBLIC_GOOGLE_API_KEY=your_google_maps_api_key
DATABASE_URL=your_database_url
```

---

## 📁 Project Structure

```
cruiz/
├── app/
│   ├── (auth)/          # Authentication screens (welcome, sign-in, sign-up)
│   ├── (root)/
│   │   └── (tabs)/      # Main app tabs (home, rides, chat, profile)
│   ├── _layout.tsx      # Root layout with font loading
│   └── index.tsx        # Entry point / redirect
├── assets/
│   ├── fonts/           # Plus Jakarta Sans font family
│   ├── icons/           # App icons
│   └── images/          # App images & onboarding assets
├── components/          # Reusable UI components
├── constants/           # App-wide constants, icons & images map
├── types/               # TypeScript type definitions
└── tailwind.config.js   # NativeWind / Tailwind configuration
```

---

## 📱 Screens

| Screen               | Description                       |
| -------------------- | --------------------------------- |
| Welcome / Onboarding | 3-slide swiper introducing Cruiz  |
| Sign Up              | Email registration + Google OAuth |
| Sign In              | Email login + Google OAuth        |
| Home                 | Map view + ride booking           |
| Rides                | Ride history                      |
| Chat                 | In-app messaging                  |
| Profile              | User account management           |

---

<p align="center">Made with ❤️ by the Cruiz team</p>
