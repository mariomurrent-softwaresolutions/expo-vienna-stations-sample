# Vienna Stations Sample App 🚉

A comprehensive React Native mobile application built with Expo that displays Vienna public transport stations. The app allows users to browse real-time station data from Vienna's public transport network, add custom stations, and visualize all stations on an interactive map.

## Overview

This application demonstrates modern React Native development practices using the latest Expo SDK, integrating with Vienna's public transport open data API to fetch and display station information. Users can view stations in a sortable list, locate them on a map, and add their own custom stations with secure local storage.

## Features

### 🗺️ Interactive Map View
- Display all Vienna transport stations on an interactive map
- Show user's current location with geolocation support
- Navigate to specific stations by tapping them in the list
- Custom map controls for zooming in/out and centering on user location
- Real-time marker display for both official and custom stations

### 📋 Station List View
- Browse all Vienna public transport stations in a scrollable list
- Alphabetically sorted station names for easy navigation
- Pull-to-refresh functionality to update station data
- Tap any station to view its location on the map
- Displays both official Vienna stations and user-added custom stations

### ➕ Add Custom Stations
- Add your own stations with name and GPS coordinates
- Form validation for name (minimum 2 characters) and valid coordinates
- Success toast notifications when stations are saved
- Secure storage of custom stations using Expo Secure Store
- Custom stations persist across app restarts

### 🔄 Real-time Data Fetching
- Fetches station data from Vienna's official public transport API
- CSV data parsing from Wiener Linien Open Government Data
- Local caching of station data for offline access
- Automatic data refresh capability

## Technology Stack

### Core Framework
- **React** (v19.1.0) - JavaScript library for building user interfaces
- **React Native** (v0.81.5) - Cross-platform mobile development
- **Expo SDK** (~54.0.22) - Development platform and tooling
- **TypeScript** (~5.9.2) - Type-safe development
- **Expo Router** (~6.0.14) - File-based routing with typed routes

### State Management
- **Jotai** (^2.15.1) - Atomic state management
- **Jotai TanStack Query** (^0.11.0) - Async state and data fetching
- **TanStack Query Core** (^5.90.6) - Powerful data synchronization

### UI & Styling
- **NativeWind** (^4.2.1) - TailwindCSS for React Native
- **TailwindCSS** (^3.4.18) - Utility-first CSS framework
- **React Native Reanimated** (~4.1.0) - Smooth animations
- **Gluestack UI** (^3.0.12) - Component library for consistent UI
- **Tailwind Variants** (^0.1.20) - Variant-based styling utilities

### Maps & Location
- **React Native Maps** (v1.20.1) - Interactive map component
- **Expo Maps** (~0.12.8) - Expo-managed map implementation
- **Expo Location** (~19.0.7) - Geolocation services
- **React Native Gesture Handler** (~2.28.0) - Native gesture handling

### Data & Storage
- **Expo Secure Store** (~15.0.7) - Encrypted local storage
- **PapaParse** (^5.5.3) - CSV parsing for station data

### Development Tools
- **ESLint** (^9.25.0) - Code linting
- **ESLint Config Expo** (~10.0.0) - Expo-specific ESLint configuration
- **Babel Module Resolver** (^5.0.2) - Path aliasing (@/ imports)

## Project Structure

```
expo-vienna-stations-sample/
├── app/                          # Expo Router file-based routing
│   ├── (tabs)/                   # Tab navigation screens
│   │   ├── index.tsx            # Home screen - Add custom stations
│   │   ├── stations.tsx         # Station list view
│   │   ├── map.tsx              # Map view
│   │   └── _layout.tsx          # Tab navigation layout
│   └── _layout.tsx              # Root layout
├── components/                   # React components
│   ├── map/                     # Map-related components
│   │   ├── CustomMapView.tsx   # Main map component
│   │   ├── MapControls.tsx     # Zoom and location controls
│   │   └── MapControlButton.tsx # Individual control button
│   ├── stations/                # Station management components
│   │   ├── AddStations.tsx     # Form to add custom stations
│   │   └── controls/           # Form controls
│   │       └── StationsTextFormControl.tsx
│   ├── viennaStations/          # Vienna stations display
│   │   ├── ViennaStationsList.tsx
│   │   └── ViennaStationsListItem.tsx
│   ├── loading/                 # Loading indicators
│   └── ui/                      # Reusable UI components
├── core/                        # Core business logic
│   ├── data/                    # Data hooks
│   │   ├── useViennaStationsData.ts
│   │   ├── useCustomViennaStationData.ts
│   │   └── useSavedViennaStationData.ts
│   ├── geolocation/             # Location services
│   ├── storage/                 # Secure storage utilities
│   ├── mapper/                  # Data transformation
│   └── utils/                   # Utility functions
├── store/                       # Jotai state management
│   └── atoms/                   # Atomic state definitions
│       ├── vienna-stations.atom.ts
│       ├── raw-vienna-stations.atom.ts
│       ├── custom-vienna-stations.atom.ts
│       └── saved-vienna-stations.atom.ts
├── models/                      # TypeScript interfaces
│   ├── ViennaStation.ts        # Station data model
│   └── GeoLocation.ts          # Location data model
├── constants/                   # App constants
├── theme/                       # Theming configuration
└── assets/                      # Images and static files
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- iOS Simulator (for iOS development) or Android Studio (for Android development)
- Expo Go app (for testing on physical devices)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mariomurrent-softwaresolutions/expo-vienna-stations-sample.git
   cd expo-vienna-stations-sample
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npx expo start
   ```

4. Run on your preferred platform:
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Scan the QR code with Expo Go app on your physical device

### Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Start on Android emulator
- `npm run ios` - Start on iOS simulator
- `npm run web` - Start web version
- `npm run lint` - Run ESLint code linting
- `npm run reset-project` - Reset to a fresh project

## Data Source

This application fetches real-time public transport station data from Vienna's Open Government Data portal:
- **API Endpoint**: https://www.wienerlinien.at/ogd_realtime/doku/ogd/wienerlinien-ogd-haltepunkte.csv
- **Format**: CSV (parsed with PapaParse)
- **Update Frequency**: On-demand with pull-to-refresh

## Key Features Implementation

### State Management
The app uses Jotai for atomic state management, with four main atoms:
- `rawViennaStationsAtom` - Fetches CSV data from Vienna's API
- `viennaStationsAtom` - Parsed and processed station data
- `customViennaStationsAtom` - User-added custom stations
- `savedViennaStationsAtom` - Cached Vienna stations for offline access

### Secure Storage
Custom stations are stored securely using Expo Secure Store, which provides:
- Encrypted storage on iOS using Keychain Services
- Encrypted storage on Android using EncryptedSharedPreferences
- Persistent data across app sessions

### Geolocation
The app requests and uses device location to:
- Center the map on user's current position
- Enable location-based features
- Show user's position alongside stations

### Performance Optimizations
- Memoized components to prevent unnecessary re-renders
- Efficient FlatList rendering for large station lists
- Lazy loading of data with TanStack Query
- Local caching of station data for improved performance

## Platform Support

- ✅ iOS (iPhone & iPad)
- ✅ Android (phones & tablets)
- ✅ Web (responsive design)

## Architecture Highlights

- **File-based Routing**: Using Expo Router for intuitive navigation
- **Type Safety**: Full TypeScript implementation with strict mode
- **Atomic State**: Jotai atoms for granular state management
- **Component Composition**: Reusable UI components with Gluestack UI
- **Utility-First Styling**: TailwindCSS via NativeWind
- **Data Fetching**: TanStack Query for server state management

## License

This is a sample project for educational and demonstration purposes.

## Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Jotai Documentation](https://jotai.org/)
- [TanStack Query Documentation](https://tanstack.com/query)
- [Vienna Open Data Portal](https://www.data.gv.at/)
