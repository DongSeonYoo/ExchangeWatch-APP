export type ConversionData = {
  status: string;
  type: string;
  data: {
    is_first_launch: boolean;
    [key: string]: any;
  };
};

export type DeepLinkData = {
  deepLinkStatus: "FOUND" | "NOT_FOUND";
  status: string;
  type: string;
  data: {
    deep_link_value?: string;
    media_source?: string;
    [key: string]: any;
  };
};
