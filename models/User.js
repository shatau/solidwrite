import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      private: true,
    },
    image: {
      type: String,
    },
    customerId: {
      type: String,
      validate(value) {
        if (!value) return true;
        return value.includes("cus_");
      },
    },
    priceId: {
      type: String,
      validate(value) {
        if (!value) return true;
        return value.includes("price_");
      },
    },
    subscriptionId: {
      type: String,
      validate(value) {
        if (!value) return true;
        return value.includes("sub_");
      },
    },
    hasAccess: {
      type: Boolean,
      default: false,
    },
    credits: {
      type: Number,
      default: 500,
    },
    plan: {
      type: String,
      enum: ['free', 'basic', 'pro', 'ultra'],
      default: 'free',
    },
    billingInterval: {
      type: String,
      enum: ['monthly', 'annual'],
    },
    monthlyCredits: {
      type: Number,
      default: 0,
    },
    creditsResetDate: {
      type: Date,
    },
    cancelAtPeriodEnd: {
      type: Boolean,
      default: false,
    },
    subscriptionEndDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

userSchema.plugin(toJSON);

export default mongoose.models.User || mongoose.model("User", userSchema);