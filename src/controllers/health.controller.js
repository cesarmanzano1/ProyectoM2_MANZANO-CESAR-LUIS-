
// ..src/controllers/health.controller.js


const healthController = (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString()
  })
}



module.exports = {
    healthController
}