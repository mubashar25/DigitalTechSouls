import mongoose from "mongoose";

const dnsRecordSchema =
  new mongoose.Schema(
    {
      domain: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Domain",
        required: true,
      },

      type: {
        type: String,
        enum: [
          "A",
          "CNAME",
          "MX",
          "TXT",
          "NS",
        ],
        required: true,
      },

      host: {
        type: String,
        required: true,
      },

      value: {
        type: String,
        required: true,
      },

      ttl: {
        type: Number,
        default: 3600,
      },
    },
    {
      timestamps: true,
    }
  );

const DNSRecord =
  mongoose.model(
    "DNSRecord",
    dnsRecordSchema
  );

export default DNSRecord;