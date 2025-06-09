# MCP Weather Server

A demo Model Context Protocol (MCP) server that provides weather information for cities around the world.

## What is MCP?

Model Context Protocol (MCP) is an open standard that enables secure connections between AI applications and data sources. It allows AI models to access real-time information and services through standardized interfaces, making AI assistants more capable and versatile.

MCP servers act as bridges between AI models and various data sources or services, providing tools that AI assistants can use to fetch information, perform actions, and interact with external systems in a controlled and secure manner.

## About This Project

This is a demo MCP server based on the tutorial by [midudev](https://www.youtube.com/watch?v=wnHczxwukYY). It demonstrates how to create a simple MCP server that provides weather information using the Open-Meteo API.

## How It Works

The server provides a single tool called `fetch_weather` that:

1. Takes a city name as input
2. Uses the Open-Meteo geocoding API to find the city's coordinates
3. Fetches weather data using the coordinates
4. Returns comprehensive weather information including:
   - Current temperature
   - Precipitation data
   - Rain information
   - Day/night status
   - Hourly temperature forecast

## Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

Download the code and add to the MCP configurations corresponding to the selected AI client (Claude, VSCode, etc).

## API Endpoints Used

- **Geocoding**: `https://geocoding-api.open-meteo.com/v1/search`
- **Weather Data**: `https://api.open-meteo.com/v1/forecast`

## Dependencies

- `@modelcontextprotocol/sdk`: MCP SDK for TypeScript
- `axios`: HTTP client for API requests
- `zod`: Schema validation for input parameters

## Example Tool Usage

The `fetch_weather` tool can be called with a city name:

```typescript
// Input
{ city: "London" }

// Output
// Returns detailed weather data in JSON format
```

## Credits

This project is based on the MCP tutorial created by [midudev](https://www.youtube.com/watch?v=wnHczxwukYY).

Weather data provided by [Open-Meteo](https://open-meteo.com/).
