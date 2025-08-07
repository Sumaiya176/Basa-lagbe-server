import { User } from "../modules/User/user.model";

const superUser = {
  userName: "super admin",
  email: "superadmin@gmail.com",
  password: "superadmin",
  provider: "credentials",
  passwordUpdatedAt: null,
  role: "superAdmin",
  status: "active",
};

const seedSuperAdmin = async () => {
  const isSuperAdminExist = await User.findOne({ role: "superAdmin" });

  if (!isSuperAdminExist) {
    await User.create(superUser);
  }
};

export default seedSuperAdmin;
