"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItemMapperMySQL = void 0;
const mapper_1 = require("../../../../application/base/mapper");
class OrderItemMapperMySQL extends mapper_1.Mapper {
    mapFrom(param) {
        return {
            id: param.Id.toString(),
            orderId: param.OrderId.toString(),
            productId: param.ProductId.toString(),
            orderItemGuid: param.OrderItemGuid.toString(),
            quantity: param.Quantity,
            unitPriceInclTax: param.UnitPriceInclTax,
            unitPriceExclTax: param.UnitPriceExclTax,
            priceInclTax: param.PriceInclTax,
            priceExclTax: param.PriceExclTax,
            discountAmountInclTax: param.DiscountAmountInclTax,
            originalProductCost: param.OriginalProductCost,
            attributeDescription: param.AttributeDescription,
            attributesXml: param.AttributesXml,
            downloadCount: param.DownloadCount,
            isDownloadActivated: param.IsDownloadActivated,
            licenseDownloadId: param.LicenseDownloadId,
            itemWeight: param.ItemWeight,
            rentalStartDateUtc: param.RentalStartDateUtc,
            rentalEndDateUtc: param.RentalEndDateUtc,
            typeStatusOrderItemId: param.TypeStatusOrderItemId,
        };
    }
    mapTo(param) {
        return {
            Id: param.id.toString(),
            OrderId: param.orderId.toString(),
            ProductId: param.productId.toString(),
            OrderItemGuid: param.orderItemGuid.toString(),
            Quantity: param.quantity,
            UnitPriceInclTax: param.unitPriceInclTax,
            UnitPriceExclTax: param.unitPriceExclTax,
            PriceInclTax: param.priceInclTax,
            PriceExclTax: param.priceExclTax,
            DiscountAmountInclTax: param.discountAmountInclTax,
            OriginalProductCost: param.originalProductCost,
            AttributeDescription: param.attributeDescription,
            AttributesXml: param.attributesXml,
            DownloadCount: param.downloadCount,
            IsDownloadActivated: param.isDownloadActivated,
            LicenseDownloadId: param.licenseDownloadId,
            ItemWeight: param.itemWeight,
            RentalStartDateUtc: param.rentalStartDateUtc,
            RentalEndDateUtc: param.rentalEndDateUtc,
            TypeStatusOrderItemId: param.typeStatusOrderItemId,
        };
    }
}
exports.OrderItemMapperMySQL = OrderItemMapperMySQL;
