const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// const Review = new Schema(
//     {
//       name: { type: String, required: true },
//       rating: { type: Number, required: true },
//       comment: { type: String, required: true },
//       user: {
//         type: mongoose.Schema.Types.ObjectId,
//         required: true,
//         ref: "User",
//       },
//     },
//     {
//       timestamps: true,
//     }
//   );

  
const Product = new Schema({
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    // reviews: [Review],
    // rating: {
    //   type: Number,
    //   required: true,
    //   default: 0,
    // },
    // numReviews: {
    //   type: Number,
    //   required: true,
    //   default: 0,
    // },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    category: {
      type: String,
      required: true,
    }
  },
  // {
  //   timestamps: true,
  // }
);


module.exports = mongoose.model (" Product", Product)