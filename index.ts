import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import axios from 'axios';
import { z } from 'zod';

/**
 * 1. Create a new MCP server instance.
 * It handles the connection to the MCP server and provides methods to interact with it.
 */
const server = new McpServer({
  name: 'Example Server',
  version: '1.0.0',
});

/**
 * 2. Define the tools that the server will provide.
 * These tools can be used by clients to perform various actions.
 */
server.tool(
  'fetch_weather',
  'Tool to fetch weather information of a given city',
  {
    city: z.string().describe('The name of the city to fetch weather for'),
  },
  async ({ city }) => {
    const response = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`);
    const data = response.data;

    if (data.results.length === 0) {
      return {
        content: [
          {
            type: 'text',
            text: `No weather data found for city: ${city}`,
          }
        ],
      };
    }

    const { latitude, longitude } = data.results[0];
    const weatherResponse = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&current=temperature_2m,precipitation,rain,is_day`);
    const weatherData = await weatherResponse.data;

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(weatherData, null, 2),
        }
      ],
    };
  }
);

/**
 * 3. Connect the server to a transport layer.
 * Using StdioServerTransport which allows communication over standard input/output.
 */
const transport = new StdioServerTransport();
await server.connect(transport);
