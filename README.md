# Voxloud Homework Assignment: Weather Dashboard

**Objective:** Build a simple weather dashboard application that displays detailed weather information for multiple cities.

## Requirements:

1. **Application Overview:**

   - Create a simple weather dashboard that allows users to add multiple cities and view their current weather conditions.
   - Each city's card should display:
     - City name
     - Current temperature
     - Weather condition (e.g., sunny, rainy)
     - Option to remove the city from the dashboard.

2. **Technical Requirements:**

   - Use latest **Angular**
   - Fetch weather data from a public API (e.g., OpenWeatherMap API).
   - Implement the following features:
     - An input field to enter a city name and a button to add it to the dashboard.
     - A display of all added cities, each in its own card.
     - Use **RxJS** to handle API requests and manage the response data.
     - Implement a loading indicator while fetching data.
     - Implement error handling to manage cases where the city is not found.
   - Style the dashboard using **CSS** or **Sass**, ensuring a responsive design.
     Using helper style libraries like Tailwind is allowed.
   - Write unit tests for components and services using **Jasmine/Karma**.

3. **Additional Features (Optional):**

   - Save the list of cities in local storage so that they persist across page refreshes.
   - Allow users to view the forecast for the next few days for each city.
   - Add some fancy animations

4. **Submission:**
   - Use this repo as a starting point for your journey
   - Host the code in a public repository (e.g., GitHub) and provide the link.
   - Include a README file with setup instructions and details on any API keys used.

# Weather Dashboard

A modern, responsive weather dashboard built with Angular that allows users to track weather conditions for multiple cities. The application fetches real-time weather data from the OpenWeatherMap API and provides a beautiful, user-friendly interface.

## Features

### Core Features

- **Add Multiple Cities**: Search and add cities to track their weather conditions
- **Real-time Weather Data**: Displays current temperature, weather conditions, humidity, and wind speed
- **Weather Icons**: Visual weather icons from OpenWeatherMap
- **Remove Cities**: Easy removal of cities from the dashboard
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### Advanced Features

- **Local Storage Persistence**: Cities are saved locally and persist across browser sessions
- **Loading States**: Beautiful loading indicators while fetching data
- **Error Handling**: Comprehensive error handling for API failures and invalid cities
- **Clear All**: Option to remove all cities at once
- **Duplicate Prevention**: Prevents adding the same city multiple times

### Technical Features

- **RxJS Integration**: Uses RxJS for handling API requests and managing data streams
- **Unit Tests**: Comprehensive test coverage using Jasmine/Karma
- **TypeScript**: Fully typed with TypeScript for better development experience
- **Tailwind CSS**: Modern styling with Tailwind CSS
- **Angular Standalone Components**: Uses the latest Angular standalone component architecture

## Screenshots

The application features:

- A clean header with the dashboard title
- An intuitive search form to add new cities
- Weather cards displaying detailed information for each city
- Responsive grid layout that adapts to different screen sizes
- Beautiful gradient background and modern UI design

## Prerequisites

- Node.js (v23.6.1 or compatible)
- npm (v11.0.0 or compatible)
- Angular CLI (latest version)

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd weather-dashboard
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **API Key Setup**

   The application uses the OpenWeatherMap API. The API key is already configured in the application:

   ```
   API Key: cb1458bd084ed663910617c67772dc26
   ```

   If you need to use your own API key:

   - Sign up at [OpenWeatherMap](https://openweathermap.org/api)
   - Get your free API key
   - Replace the API key in `src/app/services/weather.service.ts`

## Development

### Running the Application

```bash
# Start the development server
ng serve

# The application will be available at http://localhost:4200
```

### Building for Production

```bash
# Build the application
ng build

# The build artifacts will be stored in the `dist/` directory
```

### Running Tests

```bash
# Run unit tests
ng test

# Run tests in headless mode (for CI/CD)
ng test --watch=false --browsers=ChromeHeadless

# Run end-to-end tests
ng e2e
```

### Code Quality

```bash
# Lint the code
ng lint

# Format the code
npm run format
```

## Usage

1. **Adding a City**

   - Type a city name in the search input field
   - Click "Add City" or press Enter
   - The city will be added to the dashboard with a loading indicator
   - Once loaded, the weather information will be displayed

2. **Viewing Weather Information**

   - Each city card shows:
     - City name and country
     - Current temperature in Celsius
     - Weather condition with icon
     - Humidity percentage
     - Wind speed in m/s

3. **Removing Cities**

   - Click the "×" button on any city card to remove it
   - Use "Clear All" button to remove all cities at once

4. **Error Handling**
   - Invalid city names will show an error message
   - Network errors are handled gracefully
   - Error cards can be removed like normal cards

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── city-search/          # City search form component
│   │   ├── loading-spinner/      # Loading spinner component
│   │   └── weather-card/         # Weather card component
│   ├── models/
│   │   └── weather.interface.ts  # TypeScript interfaces
│   ├── services/
│   │   ├── local-storage.service.ts  # Local storage management
│   │   └── weather.service.ts        # Weather API service
│   ├── app.component.*           # Main app component
│   └── app.config.ts            # App configuration
├── styles.scss                  # Global styles
└── index.html                   # Main HTML file
```

## API Integration

The application integrates with the OpenWeatherMap API:

- **Current Weather Endpoint**: `https://api.openweathermap.org/data/2.5/weather`
- **Forecast Endpoint**: `https://api.openweathermap.org/data/2.5/forecast`
- **Units**: Metric (Celsius, m/s)
- **Error Handling**: Comprehensive error handling for various HTTP status codes

## Technologies Used

- **Angular 19**: Latest Angular framework with standalone components
- **TypeScript**: For type safety and better development experience
- **RxJS**: For reactive programming and API management
- **Tailwind CSS**: For modern, responsive styling
- **Jasmine/Karma**: For unit testing
- **OpenWeatherMap API**: For weather data

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for providing the weather API
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
- [Angular](https://angular.io/) for the application framework

## Support

If you encounter any issues or have questions, please open an issue in the repository.

---

**Note**: This application was built as part of the Voxloud homework assignment to demonstrate Angular development skills, API integration, and modern web development practices.
