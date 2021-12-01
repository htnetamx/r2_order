export interface OrderItemInputModel {
    Id: string;
    OrderId: string;
    ProductId: string;
    OrderItemGuid: string;
    Quantity: number;
    UnitPriceInclTax: number;
    UnitPriceExclTax: number;
    PriceInclTax: number;
    PriceExclTax: number;
    DiscountAmountInclTax: number;
    OriginalProductCost: number;
    AttributeDescription?: string;
    AttributesXml?: string;
    DownloadCount: number;
    IsDownloadActivated: number;
    LicenseDownloadId?: number;
    ItemWeight?: number;
    RentalStartDateUtc?: Date;
    RentalEndDateUtc?: Date;
    TypeStatusOrderItemId?: number;
}