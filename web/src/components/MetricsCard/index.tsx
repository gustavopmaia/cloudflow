import React from 'react'
import { Card, CardContent, Typography, Box, LinearProgress } from '@mui/material'

interface MetricsCardProps {
  title: string
  value: number
  total: number
  unit: string
  color: string
}

const MetricsCard: React.FC<MetricsCardProps> = ({ title, value, total, unit, color }) => {
  const percentage = (value / total) * 100

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          {title}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant='h4' sx={{ color }}>
            {value}
            {unit}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            of {total}
            {unit}
          </Typography>
          <Box sx={{ mt: 2 }}>
            <LinearProgress
              variant='determinate'
              value={percentage}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: `${color}20`,
                '& .MuiLinearProgress-bar': {
                  backgroundColor: color,
                },
              }}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default MetricsCard
