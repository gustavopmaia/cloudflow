import { Dashboard, Dns, Folder, Settings } from '@mui/icons-material'
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Typography, useTheme } from '@mui/material'

const drawerWidth = 240

const menuItems = [
  { text: 'Dashboard', icon: <Dashboard /> },
  { text: 'Environments', icon: <Dns /> },
  { text: 'Services', icon: <Folder /> },
  { text: 'Settings', icon: <Settings /> },
]

export const Sidebar = () => {
  const theme = useTheme()

  return (
    <Drawer
      variant='permanent'
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: theme.palette.background.default,
          borderRight: `1px solid ${theme.palette.divider}`,
        },
      }}
    >
      <Box sx={{ p: 3 }}>
        <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
          CloudFlow Console
        </Typography>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            component='li'
            sx={{
              mb: 1,
              mx: 1,
              borderRadius: 1,
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
              cursor: 'pointer',
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}
