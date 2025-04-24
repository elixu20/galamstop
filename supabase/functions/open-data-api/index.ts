
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
      const { data: statsData, error: statsError } = await supabase.rpc('get_report_statistics')
      data = statsData
      error = statsError
    } else {
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
