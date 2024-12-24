import React, { useState } from 'react'
import { Box, Container, Typography, Link, Grid2, TextField } from '@mui/material'
import * as S from './styles'

export default function SignupView() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Login attempt with:', { email, password })
  }

  return (
    <Grid2 container display={'flex'} justifyContent='center' alignItems='center' sx={{ minHeight: '100vh' }}>
      <Container component='main' maxWidth='xs'>
        <S.StyledPaper elevation={3}>
          <Typography component='h1' variant='h4' gutterBottom>
            Sign up
          </Typography>
          <Typography variant='body2' color='textSecondary'>
            Create your account
          </Typography>

          <S.Form onSubmit={handleSubmit}>
            <Box mt={2} mb={2} display='flex' justifyContent='space-between'>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='firstName'
                label='First name'
                name='firstName'
                autoComplete='firstName'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                sx={{ mr: 1 }}
              />

              <TextField
                variant='outlined'
                required
                fullWidth
                id='lastName'
                label='Last name'
                name='lastName'
                autoComplete='lastName'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                sx={{ ml: 1 }}
              />
            </Box>

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
                Don't have an account?{' '}
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
