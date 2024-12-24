import React from 'react'
import { Card, CardContent, Typography, Box, Chip } from '@mui/material'

interface EnvironmentCardProps {
  name: string
  status: 'healthy' | 'warning' | 'error'
  services: number
  lastDeployed: string
}

const EnvironmentCard: React.FC<EnvironmentCardProps> = ({ name, status, services, lastDeployed }) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant='h6'>{name}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant='body2' sx={{ ml: 1 }}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Chip label={`${services} Services`} size='small' sx={{ backgroundColor: 'rgba(0,0,0,0.08)' }} />
        </Box>
        <Typography variant='body2' color='text.secondary'>
          Last deployed: {lastDeployed}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default EnvironmentCard
