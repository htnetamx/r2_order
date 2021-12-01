import { OrderBaseModel } from '../../../entities/order';

export interface OrderMySQL {
  Id: string;
  CustomOrderNumber: string;
  BillingAddressId: string;
  CustomerId: string;
  PickupAddressId?: string;
  ShippingAddressId?: string;
  OrderGuid: string;
  StoreId: string;
  PickupInStore: string;
  OrderStatusId: string;
  ShippingStatusId: string;
  PaymentStatusId: string;
  PaymentMethodSystemName?: string;
  CustomerCurrencyCode?: string;
  CurrencyRate: number;
  CustomerTaxDisplayTypeId: string;
  VatNumber?: string;
  OrderSubtotalInclTax: number;
  OrderSubtotalExclTax: number;
  OrderSubTotalDiscountInclTax: number;
  OrderSubTotalDiscountExclTax: number;
  OrderShippingInclTax: number;
  OrderShippingExclTax: number;
  PaymentMethodAdditionalFeeInclTax: number;
  PaymentMethodAdditionalFeeExclTax: number;
  TaxRates?: string;
  OrderTax: number;
  OrderDiscount: number;
  OrderTotal: number;
  RefundedAmount: number;
  RewardPointsHistoryEntryId?: string;
  CheckoutAttributeDescription?: string;
  CheckoutAttributesXml?: string;
  CustomerLanguageId: string;
  AffiliateId: string;
  CustomerIp?: string;
  AllowStoringCreditCardNumber: number;
  CardType?: string;
  CardName?: string;
  CardNumber?: string;
  MaskedCreditCardNumber?: string;
  CardCvv2?: string;
  CardExpirationMonth?: string;
  CardExpirationYear?: string;
  AuthorizationTransactionId?: string;
  AuthorizationTransactionCode?: string;
  AuthorizationTransactionResult?: string;
  CaptureTransactionId?: string;
  CaptureTransactionResult?: string;
  SubscriptionTransactionId?: string;
  PaidDateUtc?: Date;
  ShippingMethod?: string;
  ShippingRateComputationMethodSystemName?: string;
  CustomValuesXml?: string;
  Deleted: number;
  CreatedOnUtc: Date;
  RedeemedRewardPointsEntryId?: number;
}

export class User {
  // public static save() {}
  // public static findOne() {}
}
