export interface MenuProps {
  id: string;
  name: string;
  drinkMenuFile: string;
  foodMenuFile: string;
  spaMenuFile: string;
  accommodationMenuFile: string;
  foodReviewUrl: string;
  drinkReviewUrl: string;
  spaReviewUrl: string;
  accommodationReviewUrl: string;
  logoUrl: string;
  createdAt: string;
  type: string;
}

export interface MenuResponse {
  data: MenuProps[];
  meta: {
    total: number;
    page: number;
    totalPages: number;
    skip: number;
    take: number;
  };
}

export interface MenuCardProps extends MenuProps {
  setShowEditMenu?: (show: boolean) => void;
  setShowPreviewMenu?: (show: boolean) => void;
  setShowDeleteMenu?: (show: boolean) => void;
  setShowQRMenu?: (show: boolean) => void;
  setMenuName?: (arg0: string) => string;
  setMenuId?: (arg0: string) => string;
  setMenuDetails?: (arg0: MenuProps) => void;
}

export interface FilledMenuProps {
  data: MenuResponse;
  debouncedSearchTerm: string;
  isLoading: boolean;
  take: number;
  page: number;
  setPage: (page: number) => void;
  openDate: boolean;
  setOpenDate: (arg: boolean) => void;
  calendarRef: any;
  range: any;
  setRange: any;
}

export interface CreateMenuProps {
  setShowCreateMenu?: (show: boolean) => void;
}
export interface EditMenuProps {
  setShowEditMenu?: (show: boolean) => void;
  menuId: string;
}

export interface PreviewMenuProps {
  setShowPreviewMenu?: (show: boolean) => void;
  menuId: string;
}
