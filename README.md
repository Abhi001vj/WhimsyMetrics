# WhimsyMeasure - Quirky Unit Converter

WhimsyMeasure is a whimsical web application that converts standard measurements into quirky, non-standard units with visual comparisons. This project provides fun and intuitive ways to understand measurements by comparing them to everyday objects and interesting phenomena.

![WhimsyMeasure](https://github.com/yourusername/whimsymeasure/raw/main/screenshot.png)

## Features

- Convert standard measurements (weight, length, volume, time, speed) to quirky units
- Visual representations of conversions for intuitive understanding
- Fun facts about each quirky unit for engagement and education
- Responsive design that works across desktop and mobile devices
- Simple, clean interface with search-based conversion

## Technology Stack

- **Frontend**: React, TypeScript, TailwindCSS, Shadcn UI components
- **Backend**: Node.js, Express
- **State Management**: TanStack Query (React Query)
- **Styling**: TailwindCSS, shadcn/ui
- **Routing**: wouter
- **Form Handling**: react-hook-form, zod validation
- **Data Visualization**: Basic SVG rendering with React components

## Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

## Installation and Setup

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/whimsymeasure.git
   cd whimsymeasure
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   This will start both the frontend and backend on the same port (default: 5000).

4. Open your browser and navigate to:
   ```
   http://localhost:5000
   ```

### Environment Variables

For local development, you can create a `.env` file in the root directory with the following variables:
```
PORT=5000
NODE_ENV=development
```

## Project Structure

```
whimsymeasure/
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── hooks/        # Custom hooks
│   │   ├── icons/        # SVG icons
│   │   ├── lib/          # Utility functions and libraries
│   │   ├── pages/        # Page components
│   │   ├── App.tsx       # Root component
│   │   └── main.tsx      # Entry point
│   └── index.html        # HTML template
├── server/               # Backend Express server
│   ├── routes.ts         # API routes
│   ├── storage.ts        # Data storage and methods
│   └── index.ts          # Server entry point
├── shared/               # Shared types and schemas
│   └── schema.ts         # Database schemas and types
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration
└── README.md             # Project documentation
```

## Deployment

### Vercel Deployment

The application is set up to be easily deployed to Vercel.

1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy the application:
   ```bash
   vercel
   ```

   Follow the prompts to complete the deployment.

4. For production deployment:
   ```bash
   vercel --prod
   ```

### vercel.json Configuration

Add a `vercel.json` file to the root of your project with the following configuration:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server/index.ts",
      "use": "@vercel/node"
    },
    {
      "src": "client/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "server/index.ts"
    },
    {
      "src": "/(.*)",
      "dest": "client/dist/$1"
    }
  ]
}
```

## Docker Deployment

A Dockerfile is included for containerized deployment.

### Building the Docker Image

```bash
# Build the image
docker build -t whimsymeasure .

# Run the container
docker run -p 5000:5000 whimsymeasure
```

### Docker Compose

You can also use Docker Compose for easier deployment:

1. Create a `docker-compose.yml` file:
```yaml
version: '3'
services:
  whimsymeasure:
    build: .
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
```

2. Run with Docker Compose:
```bash
docker-compose up
```

## Data Structure

The application uses several data types to handle conversions:

### Quirky Units

Each quirky unit includes:
- Name (singular and plural forms)
- Conversion value (relative to standard unit)
- Base unit (kg, m, l, s, kph)
- Category (weight, length, volume, time, speed)
- Icon for visual representation
- Description of the unit
- Fun fact about the unit

### Conversion Results

Conversion results include:
- Original query
- Standard value and unit
- Quirky unit information
- Conversion to quirky amount
- Fun fact about the quirky unit
- Visual comparison

## API Routes

- `GET /api/quirky-units`: Get all quirky units
- `GET /api/quirky-units/:id`: Get a specific quirky unit
- `GET /api/quirky-units/category/:category`: Get all quirky units in a category
- `POST /api/convert`: Convert a measurement to quirky units

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Shadcn UI for beautiful, accessible components
- TailwindCSS for streamlined styling
- React and Express for building the application
- All the contributors who make this project better

---

Created with ❤️ by [Your Name]