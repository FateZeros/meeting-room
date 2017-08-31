module.exports = app => {
  app.use('/api', require('./login'))
  app.use('/api', require('./room'))
  app.use('/api', require('./roomList'))
  app.use('/api', require('./user'))
}