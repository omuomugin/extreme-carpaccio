var express = require('express')
var _ = require('lodash')

module.exports = function (sellerService, dispatcher) {
  var router = express.Router()
  var OK = 200
  var BAD_REQUEST = 400

  router.get('/sellers', function (request, response) {
    // seller view is returned, to prevent any confidential information leaks
    var sellerViews = _.map(sellerService.allSellers(), function (seller) {
      return {
        cash: seller.cash,
        name: seller.name,
        online: seller.online
      }
    })
    response.status(OK).send(sellerViews)
  })

  router.get('/sellers/history', function (request, response) {
    var chunk = request.query.chunk || 10
    response.status(OK).send(sellerService.getCashHistory(chunk))
  })

  // Seller registration disabled - using fixed localhost:9000 client
  router.post('/seller', function (request, response) {
    response.status(BAD_REQUEST).send({ message: 'Client registration disabled - using fixed localhost:9000 client' })
  })

  return router
}
