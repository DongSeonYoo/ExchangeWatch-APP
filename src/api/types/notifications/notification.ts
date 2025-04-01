export type NotificationType =
  | "TARGET_PRICE"
  | "RAPID_FLUCTUATION"
  | "DAILY_REPORT";

export interface BaseNotification {
  idx: string;
  userIdx: number;
  notificationType: NotificationType;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TargetPriceNotification extends BaseNotification {
  notificationType: "TARGET_PRICE";
  notificationData: {
    baseCurrency: string;
    currencyCode: string;
    targetPrice: number;
  };
}

export interface RapidFluctuationNotification extends BaseNotification {
  notificationType: "RAPID_FLUCTUATION";
  notificationData: {
    currencyPair: string;
    fluctuationPercentage: number;
    timePeriodMinutes: number;
  };
}

export interface DailyReportNotification extends BaseNotification {
  notificationType: "DAILY_REPORT";
  notificationData: {
    currencies: string[];
    deliveryTime: string;
  };
}

export type Notification =
  | TargetPriceNotification
  | RapidFluctuationNotification
  | DailyReportNotification;

export interface NotificationHistory {
  notificationIdx: string;
  userIdx: number;
  triggeredAt: Date;
  sentToUser: boolean;
  sentToFcm: boolean;
  fcmResponse?: string;
  details: any;
}
