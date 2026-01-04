import mongoose from "mongoose";

export interface Certificate extends mongoose.Document {
  email: string;
  name: string;
  certificateId: string;
}

const CertificateSchema = new mongoose.Schema<Certificate>({
  email: {
    type: String,
    required: [true, "Please provide an email address"],
  },
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  certificateId: {
    type: String,
    required: [true, "Please provide a certificate ID"],
    unique: true,
  },
});

export default mongoose.models.Certificate ||
  mongoose.model<Certificate>("Certificate", CertificateSchema);
