import moment from 'moment';

import { Credential } from '../../../application/domain/credential';
import { OrderMapperMySQL } from './mappers';
import { Connection } from '../../../connections/connection';
import { IOrderRepository } from '../../../application/contracts/order/index';
import { OrderBaseModel } from '../../entities/order';
import { OrderItemMapperMySQL } from './mappers/orderItem';
import { IOrderItemRepository } from '../../../application/contracts/orderItem/index';
import { OrderItemBaseModel } from '../../entities/orderItem';
import { IBasket } from '../../entities/basket';
import { stringify } from 'querystring';


export class RepositoryMySQL implements IOrderRepository {
  private userMapper: OrderMapperMySQL;

  constructor() {
    this.userMapper = new OrderMapperMySQL();
  }

  async getAll(): Promise<Array<OrderBaseModel | null> | null> {
    try {
      if (Connection.mySQL2Pool == null) return null;
      const [results, fields] = await Connection.mySQL2Pool.query(
        'SELECT * from netamx.Order;'
      );
      const data = Object.values(JSON.parse(JSON.stringify(results)));
      const result = data.map<OrderBaseModel>((r) => new OrderMapperMySQL().mapFrom(r as any));
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getById(id: any): Promise<OrderBaseModel | null> {
    try {
      if (Connection.mySQL2Pool == null) return null;
      const [results, fields] = await Connection.mySQL2Pool.query({
        sql: `SELECT * from netamx.Order where id=${  id  };`,
      });
      const data = Object.values(JSON.parse(JSON.stringify(results)));
      const entity = new OrderMapperMySQL().mapFrom(data[0] as any);
      console.log(entity);
      return entity;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async post(params: IBasket): Promise<OrderBaseModel | null> {
    try {
      if (Connection.mySQL2Pool == null) return null;

      var [results2, fields2] = await Connection.mySQL2Pool.query({
        sql: `SELECT * from netamx.Customer where Id=${params.customerId};`,
      });
      var [results3, fields3] = await Connection.mySQL2Pool.query({
        sql: `SELECT * from netamx.Store where Id=${params.storeId};`,
      });

      const customer = Object.values(JSON.parse(JSON.stringify(results2)));
      const store = Object.values(JSON.parse(JSON.stringify(results3)));

      console.log(customer);
      console.log(store);

      var addressId = moment((customer[0] as any).BillingAddress_Id, 'DD-MM-YYYY');

      var startDate = moment((customer[0] as any).CreatedOnUtc, 'DD-MM-YYYY');
      var endDate = moment((store[0] as any).CreatedOnUtc, 'DD-MM-YYYY'); 
      var dayDiff = endDate.diff(startDate, 'days');
      var creationDayDiff = moment().diff(startDate, 'days');
      console.log('Days:' + dayDiff);
      if(creationDayDiff < 8) {
        if (dayDiff < 8 && dayDiff >= 0) {
          params.discountCoupon = "NEW_CUSTOMER_NEW_STORE_30";
        }
      }
      else {
        params.discountCoupon = "BUEN_FIN_NETA_10";
      }

      // var [results4, fields4] = await Connection.mySQL2Pool.query({
      //   sql: `SELECT * from netamx.Store where Id=${params.discountCoupon};`,
      // });
      // const discountApplied = Object.values(JSON.parse(JSON.stringify(results4)));
      // if((discountApplied[0] as any).length > 0) {
      //   params.discountCoupon = "";
      // }

      var uuid = require('uuid');
      var orderGuid = uuid.v4();

      const subTotal = params.items.reduce((acc, item) => {return acc + (item.quantity * item.price)}, 0);
      
      let discount = 0;
      let discountId = 0;
      if(params.discountCoupon !== null && params.discountCoupon !== '') {
        var [results, fields] = await Connection.mySQL2Pool.query({
          sql: `SELECT Id, DiscountAmoun from netamx.Discount where CouponCode='${params.discountCoupon}';`,
        });
        const data = Object.values(JSON.parse(JSON.stringify(results)));
      
        discountId = (data[0] as any).Id;
        discount = subTotal * - (data[0] as any).DiscountAmoun;
      }

      var orderToSave = {
        customOrderNumber: '',
        billingAddressId: addressId,
        customerId: params.customerId,
        pickupAddressId: null,
        shippingAddressId: null,
        orderGuid: orderGuid,
        storeId: params.storeId,
        pickupInStore: 0,
        orderStatusId: 10,
        shippingStatusId: 10,
        paymentStatusId: 10,
        paymentMethodSystemName: 'Payments.CashOnDelivery',
        customerCurrencyCode: 'MXN',
        currencyRate: 1,
        customerTaxDisplayTypeId: 10,
        vatNumber: null,
        orderSubtotalInclTax: subTotal,
        orderSubtotalExclTax: subTotal,
        orderSubTotalDiscountInclTax: discount,
        orderSubTotalDiscountExclTax: discount,
        orderShippingInclTax: 0,
        orderShippingExclTax: 0,
        paymentMethodAdditionalFeeInclTax: 0,
        paymentMethodAdditionalFeeExclTax: 0,
        taxRates: '0:0;',
        orderTax: 0,
        orderDiscount: subTotal - discount,
        orderTotal: discount !== 0 ? discount : subTotal,
        refundedAmount: 0,
        rewardPointsHistoryEntryId: null,
        checkoutAttributeDescription: '',
        checkoutAttributesXml: null,
        customerLanguageId: 2,
        affiliateId: 0,
        customerIp: '192.168.1.1',
        allowStoringCreditCardNumber: 0,
        cardType: '',
        cardName: '',
        cardNumber: '',
        maskedCreditCardNumber: '',
        cardCvv2: '',
        cardExpirationMonth: '',
        cardExpirationYear: '',
        authorizationTransactionId: null,
        authorizationTransactionCode: null,
        authorizationTransactionResult: null,
        captureTransactionId: null,
        captureTransactionResult: null,
        subscriptionTransactionId: null,
        paidDateUtc: null,
        shippingMethod: null,
        shippingRateComputationMethodSystemName: null,
        customValuesXml: null,
        deleted: 0,
        createdOnUtc: moment(),
        redeemedRewardPointsEntryId: null,
      } as unknown as OrderBaseModel;

      var conn = await Connection.mySQL2Pool.getConnection();

      try {
        await conn.beginTransaction();

        let sqlQryParam = '?,'.repeat(Object.values(orderToSave).length).slice(0, -1);
        [results, fields] = await conn.execute({
          sql: 'INSERT INTO netamx.Order values ('+ sqlQryParam +')',
          values: Object.values(orderToSave)
        });
  
        const data = Object.values(JSON.parse(JSON.stringify(results)));
        const orderId = (data[0] as any).insertId;
        console.log(orderId);

        var items = params.items.map(async (item) => {

          var [results5, fields5] = await conn.query({
            sql: `SELECT * from netamx.Product where Id=${item.id};`,
          });
          const dataProd = Object.values(JSON.parse(JSON.stringify(results5)));
        
          return {
            orderId: orderId,
            productId: item.id,
            orderItemGuid: uuid.v4(),
            quantity: item.quantity,
            unitPriceInclTax: (dataProd[0] as any).Price,
            unitPriceExclTax: (dataProd[0] as any).Price,
            priceInclTax: item.price * item.quantity,
            priceExclTax: item.price * item.quantity,
            discountAmountInclTax: 0,
            originalProductCost: 0,
            attributeDescription: '',
            attributesXml: '',
            downloadCount: 0,
            isDownloadActivated: 0,
            licenseDownloadId: 0,
            itemWeight: 0,
            rentalStartDateUtc: null,
            rentalEndDateUtc: null,
            typeStatusOrderItemId: null        
          };
        });

        for(var item in items) {
          sqlQryParam = '?,'.repeat(Object.values(items[item]).length).slice(0, -1);
          [results, fields] = await conn.execute({
            sql: 'INSERT INTO netamx.OrderItem values ('+ sqlQryParam +')',
            values: Object.values(items[item])
          });  
        }

        if(discountId !== 0) {
          [results, fields] = await conn.execute({
            sql: 'INSERT INTO netamx.DiscountUsageHistory values (?,?,?)',
            values: [discountId, orderId, moment()]
          });
        }

        conn.commit();
  
        return orderToSave;
      }
      catch (e) {
        conn.rollback();
        throw (e);
      }
      finally {
        conn.release();
      }
    } catch (error) {
      console.log(error);
      throw (error);
    }
  }

}



export class OrderItemRepositoryMySQL implements IOrderItemRepository {
  private userMapper: OrderItemMapperMySQL;

  constructor() {
    this.userMapper = new OrderItemMapperMySQL();
  }

  async getAllOrderItem(): Promise<Array<OrderItemBaseModel | null> | null> {
    try {
      if (Connection.mySQL2Pool == null) return null;
      const [results, fields] = await Connection.mySQL2Pool.query(
        'SELECT * from netamx.OrderItem;'
      );
      const data = Object.values(JSON.parse(JSON.stringify(results)));
      const result = data.map<OrderItemBaseModel>((r) => new OrderItemMapperMySQL().mapFrom(r as any));
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getByIdOrderItem(id: number): Promise<OrderItemBaseModel | null> {
    try {
      if (Connection.mySQL2Pool == null) return null;
      const [results, fields] = await Connection.mySQL2Pool.query({
        sql: `SELECT * from netamx.OrderItem where id=${  id  };`,
      });
      const data = Object.values(JSON.parse(JSON.stringify(results)));
      const entity = new OrderItemMapperMySQL().mapFrom(data[0] as any);
      console.log(entity);
      return entity;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
