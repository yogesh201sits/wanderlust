# Wander Lust

A Node.js/Express application for listing, reviewing, and managing travel destinations. Users can sign up, log in, create listings, and leave reviews. Built with MongoDB, EJS templates, and Mapbox integration for geocoding.

## Features

- User authentication (sign up, log in)
- CRUD operations for listings
- Reviews with ratings
- Geolocation using Mapbox
- Responsive UI with EJS layouts

## Installation

```bash
npm install
```

## Running the app

```bash
npm start
```

## Directory Structure

- `controllers/` – route handlers
- `model/` – Mongoose schemas
- `routes/` – Express routes
- `views/` – EJS templates
- `public/` – static assets

## Environment Variables

Create a `.env` file with:

```
DB_URL=<your MongoDB connection string>
MAPBOX_TOKEN=<your Mapbox API token>
SECRET=<session secret>
```

## License

MIT
