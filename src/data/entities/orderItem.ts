import { OrderItemInputModel } from '../../application/domain/orderItem';

export interface OrderItemBaseModel {
    id: string;
    orderId: string;
    productId: string;
    orderItemGuid: string;
    quantity: number;
    unitPriceInclTax: number;
    unitPriceExclTax: number;
    priceInclTax: number;
    priceExclTax: number;
    discountAmountInclTax: number;
    originalProductCost: number;
    attributeDescription?: string;
    attributesXml?: string;
    downloadCount: number;
    isDownloadActivated: number;
    licenseDownloadId?: number;
    itemWeight?: number;
    rentalStartDateUtc?: Date;
    rentalEndDateUtc?: Date;
    typeStatusOrderItemId?: number;
}

export class OrderItem implements OrderItemBaseModel {
public id: string;

public orderId: string;

public productId: string;

public orderItemGuid: string;

public quantity: number;

public unitPriceInclTax: number;

public unitPriceExclTax: number;

public priceInclTax: number;

public priceExclTax: number;

public discountAmountInclTax: number;

public originalProductCost: number;

public attributeDescription?: string;

public attributesXml?: string;

public downloadCount: number;

public isDownloadActivated: number;

public licenseDownloadId?: number;

public itemWeight?: number;

public rentalStartDateUtc?: Date;

public rentalEndDateUtc?: Date;

public typeStatusOrderItemId?: number;

constructor(data: OrderItemInputModel) {
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