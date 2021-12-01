import { OrderInputModel } from '../../application/domain/order';

export interface OrderBaseModel {
    id: string;
    customOrderNumber: string;
    billingAddressId: string;
    customerId: string;
    pickupAddressId?: string;
    shippingAddressId?: string;
    orderGuid: string;
    storeId: string;
    pickupInStore: string;
    orderStatusId: string;
    shippingStatusId: string;
    paymentStatusId: string;
    paymentMethodSystemName?: string;
    customerCurrencyCode?: string;
    currencyRate: number;
    customerTaxDisplayTypeId: string;
    vatNumber?: string;
    orderSubtotalInclTax: number;
    orderSubtotalExclTax: number;
    orderSubTotalDiscountInclTax: number;
    orderSubTotalDiscountExclTax: number;
    orderShippingInclTax: number;
    orderShippingExclTax: number;
    paymentMethodAdditionalFeeInclTax: number;
    paymentMethodAdditionalFeeExclTax: number;
    taxRates?: string;
    orderTax: number;
    orderDiscount: number;
    orderTotal: number;
    refundedAmount: number;
    rewardPointsHistoryEntryId?: string;
    checkoutAttributeDescription?: string;
    checkoutAttributesXml?: string;
    customerLanguageId: string;
    affiliateId: string;
    customerIp?: string;
    allowStoringCreditCardNumber: number;
    cardType?: string;
    cardName?: string;
    cardNumber?: string;
    maskedCreditCardNumber?: string;
    cardCvv2?: string;
    cardExpirationMonth?: string;
    cardExpirationYear?: string;
    authorizationTransactionId?: string;
    authorizationTransactionCode?: string;
    authorizationTransactionResult?: string;
    captureTransactionId?: string;
    captureTransactionResult?: string;
    subscriptionTransactionId?: string;
    paidDateUtc?: Date;
    shippingMethod?: string;
    shippingRateComputationMethodSystemName?: string;
    customValuesXml?: string;
    deleted: number;
    createdOnUtc: Date;
    redeemedRewardPointsEntryId?: number;
}

export class Order implements OrderBaseModel {
    public id: string;

    public customOrderNumber: string;

    public billingAddressId: string;

    public customerId: string;

    public pickupAddressId?: string;

    public shippingAddressId?: string;

    public orderGuid: string;

    public storeId: string;

    public pickupInStore: string;

    public orderStatusId: string;

    public shippingStatusId: string;

    public paymentStatusId: string;

    public paymentMethodSystemName?: string;

    public customerCurrencyCode?: string;

    public currencyRate: number;

    public customerTaxDisplayTypeId: string;

    public vatNumber?: string;

    public orderSubtotalInclTax: number;

    public orderSubtotalExclTax: number;

    public orderSubTotalDiscountInclTax: number;

    public orderSubTotalDiscountExclTax: number;

    public orderShippingInclTax: number;

    public orderShippingExclTax: number;

    public paymentMethodAdditionalFeeInclTax: number;

    public paymentMethodAdditionalFeeExclTax: number;

    public taxRates?: string;

    public orderTax: number;

    public orderDiscount: number;

    public orderTotal: number;

    public refundedAmount: number;

    public rewardPointsHistoryEntryId?: string;

    public checkoutAttributeDescription?: string;

    public checkoutAttributesXml?: string;

    public customerLanguageId: string;

    public affiliateId: string;

    public customerIp?: string;

    public allowStoringCreditCardNumber: number;

    public cardType?: string;

    public cardName?: string;

    public cardNumber?: string;

    public maskedCreditCardNumber?: string;

    public cardCvv2?: string;

    public cardExpirationMonth?: string;

    public cardExpirationYear?: string;

    public authorizationTransactionId?: string;

    public authorizationTransactionCode?: string;

    public authorizationTransactionResult?: string;

    public captureTransactionId?: string;

    public captureTransactionResult?: string;

    public subscriptionTransactionId?: string;

    public paidDateUtc?: Date;

    public shippingMethod?: string;

    public shippingRateComputationMethodSystemName?: string;

    public customValuesXml?: string;

    public deleted: number;

    public createdOnUtc: Date;

    public redeemedRewardPointsEntryId?: number;


    constructor(data: OrderInputModel) {
        this.id = data.Id;
        this.customOrderNumber = data.CustomOrderNumber;
        this.billingAddressId = data.BillingAddressId;
        this.customerId = data.CustomerId;
        this.pickupAddressId = data.PickupAddressId;
        this.shippingAddressId = data.ShippingAddressId;
        this.orderGuid = data.OrderGuid;
        this.storeId = data.StoreId;
        this.pickupInStore = data.PickupInStore;
        this.orderStatusId = data.OrderStatusId;
        this.shippingStatusId = data.ShippingStatusId;
        this.paymentStatusId = data.PaymentStatusId;
        this.paymentMethodSystemName = data.PaymentMethodSystemName;
        this.customerCurrencyCode = data.CustomerCurrencyCode;
        this.currencyRate = data.CurrencyRate;
        this.customerTaxDisplayTypeId = data.CustomerTaxDisplayTypeId;
        this.vatNumber = data.VatNumber;
        this.orderSubtotalInclTax = data.OrderSubtotalInclTax;
        this.orderSubtotalExclTax = data.OrderSubtotalExclTax;
        this.orderSubTotalDiscountInclTax = data.OrderSubTotalDiscountInclTax;
        this.orderSubTotalDiscountExclTax = data.OrderSubTotalDiscountExclTax;
        this.orderShippingInclTax = data.OrderShippingInclTax;
        this.orderShippingExclTax = data.OrderShippingExclTax;
        this.paymentMethodAdditionalFeeInclTax = data.PaymentMethodAdditionalFeeInclTax;
        this.paymentMethodAdditionalFeeExclTax = data.PaymentMethodAdditionalFeeExclTax;
        this.taxRates = data.TaxRates;
        this.orderTax = data.OrderTax;
        this.orderDiscount = data.OrderDiscount;
        this.orderTotal = data.OrderTotal;
        this.refundedAmount = data.RefundedAmount;
        this.rewardPointsHistoryEntryId = data.RewardPointsHistoryEntryId;
        this.checkoutAttributeDescription = data.CheckoutAttributeDescription;
        this.checkoutAttributesXml = data.CheckoutAttributesXml;
        this.customerLanguageId = data.CustomerLanguageId;
        this.affiliateId = data.AffiliateId;
        this.customerIp = data.CustomerIp;
        this.allowStoringCreditCardNumber = data.AllowStoringCreditCardNumber;
        this.cardType = data.CardType;
        this.cardName = data.CardName;
        this.cardNumber = data.CardNumber;
        this.maskedCreditCardNumber = data.MaskedCreditCardNumber;
        this.cardCvv2 = data.CardCvv2;
        this.cardExpirationMonth = data.CardExpirationMonth;
        this.cardExpirationYear = data.CardExpirationYear;
        this.authorizationTransactionId = data.AuthorizationTransactionId;
        this.authorizationTransactionCode = data.AuthorizationTransactionCode;
        this.authorizationTransactionResult = data.AuthorizationTransactionResult;
        this.captureTransactionId = data.CaptureTransactionId;
        this.captureTransactionResult = data.CaptureTransactionResult;
        this.subscriptionTransactionId = data.SubscriptionTransactionId;
        this.paidDateUtc = data.PaidDateUtc;
        this.shippingMethod = data.ShippingMethod;
        this.shippingRateComputationMethodSystemName = data.ShippingRateComputationMethodSystemName;
        this.customValuesXml = data.CustomValuesXml;
        this.deleted = data.Deleted;
        this.createdOnUtc = data.CreatedOnUtc;
        this.redeemedRewardPointsEntryId = data.RedeemedRewardPointsEntryId;

      }
}