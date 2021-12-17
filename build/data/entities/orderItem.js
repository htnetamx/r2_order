"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItem = void 0;
class OrderItem {
    constructor(data) {
        this.id = data.Id;
        this.orderId = data.OrderId;
        this.productId = data.ProductId;
        this.orderItemGuid = data.OrderItemGuid;
        this.quantity = data.Quantity;
        this.unitPriceInclTax = data.UnitPriceInclTax;
        this.unitPriceExclTax = data.UnitPriceExclTax;
        this.priceInclTax = data.PriceInclTax;
        this.priceExclTax = data.PriceExclTax;
        this.discountAmountInclTax = data.DiscountAmountInclTax;
        this.originalProductCost = data.OriginalProductCost;
        this.attributeDescription = data.AttributeDescription;
        this.attributesXml = data.AttributesXml;
        this.downloadCount = data.DownloadCount;
        this.isDownloadActivated = data.IsDownloadActivated;
        this.licenseDownloadId = data.LicenseDownloadId;
        this.itemWeight = data.ItemWeight;
        this.rentalStartDateUtc = data.RentalStartDateUtc;
        this.rentalEndDateUtc = data.RentalEndDateUtc;
        this.typeStatusOrderItemId = data.TypeStatusOrderItemId;
    }
}
exports.OrderItem = OrderItem;
