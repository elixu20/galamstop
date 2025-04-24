
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const docsHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Open Data API Documentation</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        h1 { color: #2c7a44; }
        h2 { color: #2d8a43; margin-top: 30px; }
        h3 { margin-top: 25px; }
        code {
          background-color: #f4f4f4;
          padding: 2px 5px;
          border-radius: 3px;
          font-family: 'Courier New', monospace;
        }
        pre {
          background-color: #f4f4f4;
          padding: 15px;
          border-radius: 5px;
          overflow-x: auto;
        }
        table {
          border-collapse: collapse;
          width: 100%;
          margin: 20px 0;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px 12px;
          text-align: left;
        }
        th {
          background-color: #f2f2f2;
        }
        .endpoint {
          background-color: #e8f5e9;
          padding: 10px;
          border-radius: 5px;
          margin-bottom: 15px;
        }
        .note {
          background-color: #fff8e1;
          padding: 10px;
          border-left: 4px solid #ffc107;
          margin: 20px 0;
        }
      </style>
    </head>
    <body>
      <h1>Open Data API Documentation</h1>
      <p>This API provides access to anonymized mining incident data for researchers, journalists, and NGOs to promote transparency and collaborative problem-solving.</p>
      
      <div class="note">
        <strong>Note:</strong> All data provided through this API is anonymized to protect privacy. Precise location data is reduced in precision, and all personal identifying information is removed.
      </div>
      
      <h2>Authentication</h2>
      <p>All API requests require an API key passed as a query parameter:</p>
      <pre><code>?api_key=YOUR_API_KEY</code></pre>
      <p>To request an API key, please contact the administrator.</p>
      
      <h2>Endpoints</h2>
      
      <h3 class="endpoint">GET /open-data-api/reports</h3>
      <p>Returns a list of anonymized drone reports.</p>
      
      <h4>Query Parameters</h4>
      <table>
        <tr>
          <th>Parameter</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
        <tr>
          <td>type</td>
          <td>string</td>
          <td>Filter by report type (e.g., mining_incident)</td>
        </tr>
        <tr>
          <td>from</td>
          <td>date</td>
          <td>Filter reports created after this date (ISO format)</td>
        </tr>
        <tr>
          <td>to</td>
          <td>date</td>
          <td>Filter reports created before this date (ISO format)</td>
        </tr>
        <tr>
          <td>limit</td>
          <td>number</td>
          <td>Maximum number of results to return (default: 100)</td>
        </tr>
      </table>
      
      <h4>Example Request</h4>
      <pre><code>GET /open-data-api/reports?type=mining_incident&from=2023-01-01&limit=50&api_key=YOUR_API_KEY</code></pre>
      
      <h4>Example Response</h4>
      <pre><code>{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "report_type": "mining_incident",
      "parameters": {
        "incidentType": "active_mining",
        "location": "5.55,10.10", // Reduced precision
        "description": "Illegal mining operation with heavy equipment"
      },
      "status": "completed",
      "created_at": "2023-04-01T12:00:00Z",
      "updated_at": "2023-04-01T12:30:00Z"
    }
    // Additional reports...
  ],
  "meta": {
    "api_version": "1.0.0",
    "documentation": "https://example.com/open-data-api-docs",
    "generated_at": "2023-04-15T08:30:00Z"
  }
}</code></pre>
      
      <h3 class="endpoint">GET /open-data-api/stats</h3>
      <p>Returns aggregated statistics about mining incidents.</p>
      
      <h4>Example Request</h4>
      <pre><code>GET /open-data-api/stats?api_key=YOUR_API_KEY</code></pre>
      
      <h4>Example Response</h4>
      <pre><code>{
  "data": {
    "total_reports": 1250,
    "reports_by_type": {
      "active_mining": 450,
      "water_pollution": 320,
      "deforestation": 280,
      "equipment": 150,
      "other": 50
    },
    "reports_by_month": {
      "2023-01": 80,
      "2023-02": 95,
      "2023-03": 110
      // Additional months...
    }
  },
  "meta": {
    "api_version": "1.0.0",
    "documentation": "https://example.com/open-data-api-docs",
    "generated_at": "2023-04-15T08:30:00Z"
  }
}</code></pre>
      
      <h2>Rate Limits</h2>
      <p>To ensure service stability, the API is rate limited to 100 requests per hour per API key.</p>
      
      <h2>Data Usage Guidelines</h2>
      <ul>
        <li>Please cite this API as the data source in any publications or articles.</li>
        <li>Do not attempt to de-anonymize or re-identify individuals from the data.</li>
        <li>Use the data responsibly and ethically.</li>
      </ul>
      
      <h2>Contact</h2>
      <p>For questions, bug reports, or API key requests, please contact <a href="mailto:api@example.com">api@example.com</a>.</p>
      
      <div style="margin-top: 50px; text-align: center; color: #666; font-size: 14px;">
        &copy; 2025 Galamsey Drone Monitoring System. All rights reserved.
      </div>
    </body>
    </html>
    `;

    return new Response(docsHtml, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/html'
      }
    });

  } catch (error) {
    console.error('Server error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
})
