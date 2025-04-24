
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const supabaseUrl = 'https://cqfqmkrtzalcufrlrjkv.supabase.co'
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
const supabase = createClient(supabaseUrl, supabaseServiceKey)

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const url = new URL(req.url)
    const path = url.pathname.split('/').pop()
    
    // Basic API key verification (for demonstration - in production use a more secure method)
    const apiKey = url.searchParams.get('api_key')
    if (!apiKey || apiKey !== Deno.env.get('OPEN_DATA_API_KEY')) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized access' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    let data
    let error

    // Get anonymized drone reports data
    if (path === 'reports' || !path) {
      // Get query parameters for filtering
      const reportType = url.searchParams.get('type')
      const from = url.searchParams.get('from')
      const to = url.searchParams.get('to')
      const limit = parseInt(url.searchParams.get('limit') || '100')
      
      // Start query
      let query = supabase
        .from('drone_reports')
        .select(`
          id,
          report_type,
          parameters,
          status,
          created_at,
          updated_at
        `)
      
      // Apply filters if provided
      if (reportType) {
        query = query.eq('report_type', reportType)
      }
      
      if (from) {
        query = query.gte('created_at', from)
      }
      
      if (to) {
        query = query.lte('created_at', to)
      }
      
      // Execute query with limit
      const { data: reportData, error: reportError } = await query
        .order('created_at', { ascending: false })
        .limit(limit)
      
      data = reportData
      error = reportError
      
      // Anonymize data by removing any potential PII from parameters
      if (data) {
        data = data.map(report => {
          // Deep copy the parameters to avoid modifying the original
          const parameters = JSON.parse(JSON.stringify(report.parameters))
          
          // Remove potentially identifying information
          if (parameters.userId) delete parameters.userId
          if (parameters.email) delete parameters.email
          if (parameters.phone) delete parameters.phone
          if (parameters.name) delete parameters.name
          
          // Replace exact coordinates with approximate ones for privacy (reduce precision)
          if (parameters.location && typeof parameters.location === 'string') {
            // If it looks like coordinates, reduce precision
            if (/^-?\d+\.\d+,\s*-?\d+\.\d+$/.test(parameters.location)) {
              const [lat, lng] = parameters.location.split(',').map(Number)
              parameters.location = `${lat.toFixed(2)},${lng.toFixed(2)}`
            }
          }
          
          return {
            ...report,
            parameters
          }
        })
      }
    } 
    // Get aggregated statistics
    else if (path === 'stats') {
      // Get statistics directly from database to reduce client-side processing
      const { data: statsData, error: statsError } = await supabase.rpc('get_report_statistics')
      data = statsData
      error = statsError
    }
    // Get analytics data (new endpoint)
    else if (path === 'analytics') {
      const type = url.searchParams.get('type') || 'activity_trend'
      const timePeriod = url.searchParams.get('period') || '3months'
      const region = url.searchParams.get('region') || 'all'
      
      let period = 90; // default 3 months in days
      
      if (timePeriod === '30days') period = 30;
      else if (timePeriod === '6months') period = 180;
      else if (timePeriod === '1year') period = 365;
      
      // Get analytics data based on type
      switch (type) {
        case 'activity_trend': {
          const { data: trendsData, error: trendsError } = await supabase
            .from('drone_reports')
            .select('created_at, status, report_type')
            .gte('created_at', new Date(Date.now() - period * 24 * 60 * 60 * 1000).toISOString())
            .order('created_at');
          
          if (trendsError) {
            data = null;
            error = trendsError;
          } else {
            // Process the data into monthly groups
            const monthlyData: Record<string, any> = {};
            
            trendsData?.forEach(report => {
              const date = new Date(report.created_at);
              const monthYear = `${date.toLocaleString('default', { month: 'short' })}`;
              
              if (!monthlyData[monthYear]) {
                monthlyData[monthYear] = { name: monthYear, reports: 0, enforcement: 0 };
              }
              
              monthlyData[monthYear].reports += 1;
              if (report.status === 'completed') {
                monthlyData[monthYear].enforcement += 1;
              }
            });
            
            // Convert to array for the client
            data = Object.values(monthlyData);
          }
          break;
        }
        
        case 'regional_distribution': {
          // In a real scenario, you would have real regional data in your database
          // For now we'll return some sample data
          data = [
            { name: 'Ashanti', value: 235 },
            { name: 'Western', value: 187 },
            { name: 'Eastern', value: 162 },
            { name: 'Central', value: 95 },
            { name: 'Greater Accra', value: 57 },
            { name: 'Upper East', value: 42 },
            { name: 'Upper West', value: 38 },
            { name: 'Northern', value: 25 }
          ];
          
          // Filter by region if specified
          if (region !== 'all') {
            data = data.filter(item => 
              item.name.toLowerCase().includes(region.toLowerCase())
            );
          }
          break;
        }
        
        // Additional analytics types can be added here
        default:
          data = null;
          error = { message: 'Unsupported analytics type' };
      }
    }
    else {
      return new Response(
        JSON.stringify({ error: 'Invalid endpoint' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (error) {
      console.error('API error:', error)
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Add documentation link and versioning info
    const response = {
      data,
      meta: {
        api_version: '1.0.0',
        documentation: 'https://example.com/open-data-api-docs',
        generated_at: new Date().toISOString()
      }
    }

    return new Response(
      JSON.stringify(response),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Server error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
