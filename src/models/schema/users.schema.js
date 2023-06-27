const { Schema, model, default: mongoose } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const collection = "users";

const schema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  github_username: {
    type: String,
    unique: true,
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
  orders: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "orders",
      },
    ],
    default: [],
  },
});

schema.plugin(mongoosePaginate);
const UsersModel = model(collection, schema);
module.exports = UsersModel;
