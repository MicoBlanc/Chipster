import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const startTime = Date.now()
  
  try {
    // Basic memory usage check
    const used = process.memoryUsage()
    
    res.status(200).json({
      status: 'ok',
      timestamp: startTime,
      env: process.env.NODE_ENV,
      memory: {
        heapUsed: Math.round(used.heapUsed / 1024 / 1024) + 'MB',
        rss: Math.round(used.rss / 1024 / 1024) + 'MB'
      },
      uptime: process.uptime()
    })
  } catch (error) {
    console.error('Health check failed:', error)
    res.status(500).json({ 
      status: 'error',
      message: error.message,
      timestamp: startTime
    })
  }
}