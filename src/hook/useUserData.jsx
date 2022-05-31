import { useSelector } from "react-redux";

export const useUserData = () => {
  const userData = useSelector((state) => state.data.userData);
 
  const { name, role, email, organization, phone, score, rate, birthday } =
    userData;

  return {
    name,
    role,
    email,
    organization,
    phone,
    score,
    rate,
    birthday,
  };
};