const getSERVICES = require("../services/index.service");
const { HTTP_STATUS } = require("../utils/api.utils");

const { ordersService } = getSERVICES();

class PaymentsController {
  static async createSession(req, res, next) {
    try {
      const orders = await ordersService.getOrders();
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              product_data: {
                name: orders[0].products._id,
                description: "Gaming Laptop",
              },
              currency: "USD",
              unit_amount: orders[0].products.price,
            },
            quantity: orders[0].products.quantity,
          },
        ],
        mode: "payment",
      });
      res.status(HTTP_STATUS.OK).json(session);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PaymentsController;
