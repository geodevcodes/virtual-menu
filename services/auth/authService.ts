import { ForgotPasswordType, LoginType, SignupType } from "@/types/authType";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../axios";
import { toast } from "sonner";

const AuthService = {
  // Account Creation
  async signUp(body: SignupType) {
    try {
      const response = await axiosInstance.post("/auth/register", body);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Login
  async login(body: LoginType) {
    try {
      const response = await axiosInstance.post("/auth/login", body);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// RESET PASSWORD REQUEST
export const useResetPassword = () => {
  return useMutation({
    mutationFn: async ({ payload }: { payload: any }) => {
      try {
        const response = await axiosInstance.put(
          "/auth/reset-password",
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Reset Password successfully! 🎉");
    },
    onError: (error: any) => {
      if (error.response?.status === 500) {
        toast.error("Internal Server Error");
      } else {
        toast.error(error.response?.data?.message);
      }
    },
  });
};

// Forgot Password Request
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (payload: ForgotPasswordType) => {
      try {
        const response = await axiosInstance.post(
          "/auth/forgot-password",
          payload
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Reset Password Email Sent! 🎉");
    },
    onError: (error: any) => {
      if (error.response?.status === 500) {
        toast.error("Internal Server Error");
      } else {
        toast.error(error.response?.data?.message);
      }
    },
  });
};

export default AuthService;
