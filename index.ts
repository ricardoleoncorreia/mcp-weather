import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
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
    return {
      content: [
        {
          type: 'text',
          text: `The weather in ${city} is sunny with a temperature of 25°C.`,
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
