export const useGetUser = () => {
  if (typeof window !== "undefined") {
    const result = sessionStorage.getItem("user");
    return result ? JSON.parse(result) : null;
  }
};
