import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../axios";
import { toast } from "sonner";

// CREATE MENU REQUEST
export const useCreateMenu = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ formData }: { formData: FormData }) => {
      try {
        const response = await axiosInstance.post("/menu", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Menu created successfully! 🎉");
      queryClient.invalidateQueries({ queryKey: ["menu-list"] });
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

// UPDATE MENU REQUEST
export const useUpdateMenu = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      formData,
      menuId,
    }: {
      formData: FormData;
      menuId: string;
    }) => {
      try {
        const response = await axiosInstance.patch(`/menu/${menuId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Menu updated successfully! 🎉");
      queryClient.invalidateQueries({ queryKey: ["menu-list"] });
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

// GET MENU BY ID REQUEST
export const useGetMenu = (menuId: string) => {
  return useQuery({
    queryKey: ["menu", menuId],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(`/menu/${menuId}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        return response.data;
      } catch (error: any) {
        throw error;
      }
    },
    enabled: !!menuId,
  });
};

// GET ALL MENU
export const useGetMenus = (
  skip?: number,
  take?: number,
  search = "",
  startDate?: string,
  endDate?: string
) => {
  const shouldFilter = startDate && endDate;

  return useQuery({
    queryKey: ["menu-list", skip, take, search, startDate, endDate],
    queryFn: async () => {
      try {
        const params = new URLSearchParams();

        if (skip) params.append("skip", String(skip));
        if (take) params.append("take", String(take));
        if (search.trim()) params.append("search", search);
        if (shouldFilter) {
          params.append("startDate", startDate!);
          params.append("endDate", endDate!);
        }

        const queryString = params.toString() ? `?${params.toString()}` : "";
        const response = await axiosInstance.get(`/menu${queryString}`);
        return response.data;
      } catch (error: any) {
        throw error;
      }
    },
    enabled: !startDate || !!endDate,
  });
};

// DELETE FILE MENU REQUEST
export const useDeleteFileMenu = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      menuId,
      menuFile,
    }: {
      menuId: string;
      menuFile: string;
    }) => {
      const response = await axiosInstance.delete(
        `/menu/deleteFile/${menuId}?fieldName=${menuFile}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menu-list"] });
    },
    onError: (error: any) => {
      console.log(error.response?.data?.message || "Failed to delete file");
      queryClient.invalidateQueries({ queryKey: ["menu-list"] });
    },
  });
};

// DELETE MENU REQUEST
export const useDeleteMenu = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (menuId: string) => {
      try {
        const response = await axiosInstance.delete(`/menu/${menuId}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Menu deleted successfully! 🎉");
      queryClient.invalidateQueries({ queryKey: ["menu-list"] });
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
