import { Box, CssBaseline, ThemeProvider, createTheme, Grid, Typography, Container } from '@mui/material'
import { Sidebar } from '../../components/Sidebar'
import MetricsCard from '../../components/MetricsCard'
import EnvironmentCard from '../../components/EnvironmentCard'

const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#f5f5f9',
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 0 0 1px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.1)',
        },
      },
    },
  },
})

const environments = [
  { name: 'Production', status: 'healthy' as 'healthy', services: 12, lastDeployed: '2h ago' },
  { name: 'Staging', status: 'warning' as 'warning', services: 8, lastDeployed: '30m ago' },
  { name: 'Development', status: 'healthy' as 'healthy', services: 15, lastDeployed: '5m ago' },
]

export function DashboardView() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar />
        <Box
          component='main'
          sx={{
            flexGrow: 1,
            p: 3,
            backgroundColor: 'background.default',
          }}
        >
          <Container maxWidth='xl'>
            <Typography variant='h4' sx={{ mb: 4, mt: 2 }}>
              Dashboard
            </Typography>

            <Typography variant='h5' sx={{ mb: 3 }}>
              Environments
            </Typography>
            <Grid container spacing={3}>
              {environments.map((env) => (
                <Grid item xs={12} md={4} key={env.name}>
                  <EnvironmentCard {...env} />
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  )
}
