import { styled } from '@mui/material'

export const SidebarContainer = styled('div')`
  background-color: #f5f5f9;
  color: #444444;
  height: 100vh;
  width: 250px;
  padding: 20px;
  display: flex;
  flex-direction: column;
`

export const SidebarItem = styled('li')`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #cecece;
  }
`
