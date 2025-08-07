export interface IUser {
  userName: string;
  email: string;
  password?: string | null;
  provider: "google" | "github" | "facebook" | "credentials";
  passwordUpdatedAt?: Date | null;
  role: "user" | "admin" | "superAdmin";
  status: "blocked" | "active";
}
