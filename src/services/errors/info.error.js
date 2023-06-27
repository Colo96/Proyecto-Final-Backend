const generateUserErrorInfo = (user) => {
  return `One or more properties were incomplete or not valid.
    List of required properties:
    * first_name: needs to be a string, recived ${user.first_name}
    * last_name: needs to be a string, recived ${user.last_name}
    * email: needs to be a string, recived ${user.email}
    * password: needs to be a string, recived ${user.password}
    * github_username: needs to be a string, recived ${user.github_username}
    * role: needs to be a string, recived ${user.role}
    * ordes: needs to be a array, recived ${user.ordes}`;
};

const generateOrderErrorInfo = (order) => {
  return `One or more properties were incomplete or not valid.
  List of required properties:
  * order_number: needs to be a string, recived ${order.order_number}
  * business: needs to be an object, recived ${order.business}
  * user: needs to be an object, recived ${order.user}
  * status: needs to be a string, recived ${order.status}
  * products: needs to be an array, recived ${order.products}
  * total_price: needs to be a number, recived ${order.total_price}`;
};

const generateBusinessErrorInfo = (business) => {
  return `One or more properties were incomplete or not valid.
    List of required properties:
    * name: needs to be a string, recived ${business.name}
    * products: needs to be an array, recived ${business.products}`;
};

const generateProductErrorInfo = (product) => {
  return `One or more properties were incomplete or not valid.json
    List of required properties:
    * title: needs to be a string, recived ${product.title}
    * price: needs to be a number, recived ${product.price}
    * stock: needs to be a number, recived ${product.stock}
    * thumbnail_url: needs to be a string, recived ${product.thumbnail_url}
    * description: needs to be a string, recived ${product.description}
    * business: needs to be a object id, recived ${product.business}`;
};

module.exports = {
  generateUserErrorInfo,
  generateOrderErrorInfo,
  generateBusinessErrorInfo,
  generateProductErrorInfo,
};
