import { Mapper } from '../../../../application/base/mapper';
import { OrderItemBaseModel } from '../../../entities/orderItem';
import { OrderItemMySQL } from '../models/orderItem';


export class OrderItemMapperMySQL extends Mapper<OrderItemMySQL, OrderItemBaseModel> {
    mapFrom(param: OrderItemMySQL): OrderItemBaseModel {
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

    mapTo(param: OrderItemBaseModel): OrderItemMySQL {
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
  