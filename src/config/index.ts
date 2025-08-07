import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS || "10",
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  session_secret: process.env.SESSION_SECRET,
  email_user: process.env.EMAIL_USER,
  email_pass: process.env.EMAIL_PASS,
  frontend_url: process.env.FRONTEND_URL,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  github_id: process.env.GITHUB_ID,
  github_secret: process.env.GITHUB_SECRET,
  google_id: process.env.GOOGLE_ID,
  google_secret: process.env.GOOGLE_SECRET,
};
