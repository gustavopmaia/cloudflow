import React, { useState } from 'react'
import { Box, Container, Typography, Link, Grid2, TextField } from '@mui/material'
import * as S from './styles'

export default function LoginView() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Login attempt with:', { email, password })
  }

  return (
    <Grid2 container display={'flex'} justifyContent='center' alignItems='center' sx={{ minHeight: '100vh' }}>
      <Container component='main' maxWidth='xs'>
        <S.StyledPaper elevation={3}>
          <Typography component='h1' variant='h4' gutterBottom>
            Login
          </Typography>
          <Typography variant='body2' color='textSecondary'>
            Please sign in to your account
          </Typography>

          <S.Form onSubmit={handleSubmit}>
            <Box mb={2}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>

            <Box mb={2}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>

            <S.SubmitButton type='submit' fullWidth variant='contained' color='primary'>
              Sign In
            </S.SubmitButton>

            <Box mt={2} textAlign='center'>
              <Typography variant='body2' display='inline'>
                Don't have an account?
              </Typography>
              <Link href='#' variant='body2'>
                Sign up
              </Link>
            </Box>
          </S.Form>
        </S.StyledPaper>
      </Container>
    </Grid2>
  )
}
