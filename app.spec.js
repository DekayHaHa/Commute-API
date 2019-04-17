import request from 'supertest'
import app from './app'
import users from './fauxUsers'
import commutes from './fauxCommutes'
import preferences from './fauxPreferences'
import '@babel/polyfill';

describe('api', () => {
  beforeEach(() => {
    app.locals.users = users
    app.locals.commutes = commutes
    app.locals.preferences = preferences
  })
  describe('post /api/user', () => {
    it('should return a 200 status with correct user', async () => {
      const mockLogin = { name: 'Kayla', pass: 'vortex' }
      const response = await request(app).post('/api/user').send(mockLogin);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ userName: 'Kayla', id: 4 });
    });

    it('should return a 401 status when no user found or wrong pass', async () => {
      const mockLogin = { name: 'kayla', pass: 'pass' }
      const response = await request(app).post('/api/user').send(mockLogin);
      expect(response.status).toBe(401);
    });
  });

  describe('get /api/user/weather/:id', () => {
    it('should return 200 if weather is found or fetched', async () => {
      const response = await request(app).get('/api/user/weather/1')
      expect(response.status).toBe(200)
    })
  })
})