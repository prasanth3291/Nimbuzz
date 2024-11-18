# Nimbuzz Weather App
A full-stack weather application built using React, TypeScript, Node.js, Express, and MongoDB,
designed to fetch real-time weather data, allow user tagging, and provide dynamic visualizations. The
app is containerized using Docker and deployed on AWS with a custom domain and HTTPS setup.
---
## Project Structure
Nimbuzz/ nnn docker-compose.yml # Docker configuration for the entire app nnn weather-frontend/
# Frontend code (React + TypeScript) nnn weather-backend/ # Backend code (Node.js + Express +
MongoDB)
---
## Setup Instructions
### Prerequisites - Node.js and npm installed locally. - Docker installed (optional for containerized
setup). - AWS account (if deploying on AWS).
### 1. Clone the Repository ```bash git clone https://github.com/prasanth3291/Nimbuzz.git cd Nimbuzz
```
### 2. Run Locally
#### Frontend Navigate to the frontend directory: ```bash cd weather-frontend ``` Install dependencies:
```bash npm install ``` Start the development server: ```bash npm start ```
#### Backend Navigate to the backend directory: ```bash cd weather-backend ``` Install dependencies:
```bash npm install ``` Start the backend server: ```bash npm run dev ```
#### MongoDB Install and start MongoDB locally or use a cloud MongoDB service (e.g., MongoDB
Atlas). The application will be available at: - Frontend: http://localhost:3000 - Backend:
http://localhost:5000
---
### 3. Using Docker for Setup
The application is fully containerized, and Docker images are hosted on Docker Hub.
#### Docker Hub Images - Frontend: `prasanth3291/weather-frontend:latest` - Backend:
`prasanth3291/weather-backend:latest`
#### Steps to Run with Docker 1. Pull the Docker images: ```bash docker pull
prasanth3291/weather-frontend docker pull prasanth3291/weather-backend ``` 2. Build the containers
using `docker-compose.yml`: ```bash docker-compose up ``` 3. Access the application at:
`http://localhost`.
---
## Data Ingestion - The backend fetches weather data from the OpenWeatherMap API: - Base URL:
https://api.openweathermap.org/data/2.5 - Key Features: - City-based weather search. - 4-hour
forecast. - Data is stored in MongoDB for efficient querying and tagging.
---
## Deployment on AWS
### Custom Domain Setup - Purchased domain (`nimbuzz.xyz`) via GoDaddy. - Configured DNS using
AWS Route 53.
### EC2 Instance - Pulled Docker images for frontend, backend, and MongoDB. - Started containers
for production.
### Nginx and Certbot - Configured Nginx as a reverse proxy. - Secured the app using HTTPS.
Access the app at: [https://nimbuzz.xyz](https://nimbuzz.xyz)
---
## Folder Details
### Frontend - Directory: `weather-frontend/` - Key Features: - React + TypeScript. - Implements API
calls and dynamic UI. - Tags weather conditions.
### Backend - Directory: `weather-backend/` - Key Features: - Node.js, Express, and MongoDB. -
Handles API data ingestion and database operations.
---
## How It Works
### Weather API Integration - The backend fetches weather data using the OpenWeatherMap API. -
Data is stored in MongoDB for future use.
### Frontend UI - Displays current weather and a 4-hour forecast. - Allows tagging of weather
conditions.
### Tagging and Visualization - Tags are stored in the database. - Users can filter forecasts based on
tags.
### Deployment - Docker containers are built and deployed on an AWS EC2 instance. - Nginx handles
reverse proxy and HTTPS.
---
## To Do - Implement scheduled data ingestion (e.g., cron jobs). - Add unit tests using Jest. - Expand
tagging options for more granular weather conditions.
---
## Public URL Visit the live app: [https://nimbuzz.xyz](https://nimbuzz.xyz)
