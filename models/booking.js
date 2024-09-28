import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    userId: {
      type: String
    },
    userEmail: {
      type: String,
      // required: true,
    },
    tourName:{
        type: String,
      required: true,
    },
    fullName: {  // Updated to camel case to match the input
      type: String,
      required: true,
    },
    guestSize: {
      type: Number,
      required: true
    },
    phone: {
        type: Number,
        required: true
      },
      bookAt: {
        type: Date,
        // required: true
      },

  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookSchema);
