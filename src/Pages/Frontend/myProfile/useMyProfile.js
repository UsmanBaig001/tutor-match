const useMyProfile = () => {
  const userRole = localStorage.getItem("user");
  const role = JSON.parse(userRole);
  return { role };
};

export default useMyProfile;
