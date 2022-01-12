"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItemRepositoryMySQL = exports.RepositoryMySQL = void 0;
const moment_1 = __importDefault(require("moment"));
const mappers_1 = require("./mappers");
const connection_1 = require("../../../connections/connection");
const orderItem_1 = require("./mappers/orderItem");
class RepositoryMySQL {
    constructor() {
        this.userMapper = new mappers_1.OrderMapperMySQL();
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (connection_1.Connection.mySQL2Pool == null)
                    return null;
                const [results, fields] = yield connection_1.Connection.mySQL2Pool.query('SELECT * from netamx.Order;');
                const data = Object.values(JSON.parse(JSON.stringify(results)));
                const result = data.map((r) => new mappers_1.OrderMapperMySQL().mapFrom(r));
                return result;
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (connection_1.Connection.mySQL2Pool == null)
                    return null;
                const [results, fields] = yield connection_1.Connection.mySQL2Pool.query({
                    sql: `SELECT * from netamx.Order where id=${id};`,
                });
                const data = Object.values(JSON.parse(JSON.stringify(results)));
                const entity = new mappers_1.OrderMapperMySQL().mapFrom(data[0]);
                console.log(entity);
                return entity;
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    post(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (connection_1.Connection.mySQL2Pool == null)
                    return null;
                var [results2, fields2] = yield connection_1.Connection.mySQL2Pool.query({
                    sql: `SELECT * from netamx.Customer where Id=${params.customerId};`,
                });
                var [results3, fields3] = yield connection_1.Connection.mySQL2Pool.query({
                    sql: `SELECT * from netamx.Store where Id=${params.storeId};`,
                });
                const customer = Object.values(JSON.parse(JSON.stringify(results2)));
                const store = Object.values(JSON.parse(JSON.stringify(results3)));
                console.log(customer);
                console.log(store);
                var addressId = (0, moment_1.default)(customer[0].BillingAddress_Id, 'DD-MM-YYYY');
                var startDate = (0, moment_1.default)(customer[0].CreatedOnUtc, 'DD-MM-YYYY');
                var endDate = (0, moment_1.default)(store[0].CreatedOnUtc, 'DD-MM-YYYY');
                var dayDiff = endDate.diff(startDate, 'days');
                var creationDayDiff = (0, moment_1.default)().diff(startDate, 'days');
                console.log('Days:' + dayDiff);
                if (creationDayDiff < 8) {
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
                const subTotal = params.items.reduce((acc, item) => { return acc + (item.quantity * item.price); }, 0);
                let discount = 0;
                let discountId = 0;
                if (params.discountCoupon !== null && params.discountCoupon !== '') {
                    var [results, fields] = yield connection_1.Connection.mySQL2Pool.query({
                        sql: `SELECT Id, DiscountAmoun from netamx.Discount where CouponCode='${params.discountCoupon}';`,
                    });
                    const data = Object.values(JSON.parse(JSON.stringify(results)));
                    discountId = data[0].Id;
                    discount = subTotal * -data[0].DiscountAmoun;
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
                    createdOnUtc: (0, moment_1.default)(),
                    redeemedRewardPointsEntryId: null,
                };
                var conn = yield connection_1.Connection.mySQL2Pool.getConnection();
                try {
                    yield conn.beginTransaction();
                    let sqlQryParam = '?,'.repeat(Object.values(orderToSave).length).slice(0, -1);
                    [results, fields] = yield conn.execute({
                        sql: 'INSERT INTO netamx.Order values (' + sqlQryParam + ')',
                        values: Object.values(orderToSave)
                    });
                    const data = Object.values(JSON.parse(JSON.stringify(results)));
                    const orderId = data[0].insertId;
                    console.log(orderId);
                    var items = params.items.map((item) => __awaiter(this, void 0, void 0, function* () {
                        var [results5, fields5] = yield conn.query({
                            sql: `SELECT * from netamx.Product where Id=${item.id};`,
                        });
                        const dataProd = Object.values(JSON.parse(JSON.stringify(results5)));
                        return {
                            orderId: orderId,
                            productId: item.id,
                            orderItemGuid: uuid.v4(),
                            quantity: item.quantity,
                            unitPriceInclTax: dataProd[0].Price,
                            unitPriceExclTax: dataProd[0].Price,
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
                    }));
                    for (var item in items) {
                        sqlQryParam = '?,'.repeat(Object.values(items[item]).length).slice(0, -1);
                        [results, fields] = yield conn.execute({
                            sql: 'INSERT INTO netamx.OrderItem values (' + sqlQryParam + ')',
                            values: Object.values(items[item])
                        });
                    }
                    if (discountId !== 0) {
                        [results, fields] = yield conn.execute({
                            sql: 'INSERT INTO netamx.DiscountUsageHistory values (?,?,?)',
                            values: [discountId, orderId, (0, moment_1.default)()]
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
            }
            catch (error) {
                console.log(error);
                throw (error);
            }
        });
    }
}
exports.RepositoryMySQL = RepositoryMySQL;
class OrderItemRepositoryMySQL {
    constructor() {
        this.userMapper = new orderItem_1.OrderItemMapperMySQL();
    }
    getAllOrderItem() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (connection_1.Connection.mySQL2Pool == null)
                    return null;
                const [results, fields] = yield connection_1.Connection.mySQL2Pool.query('SELECT * from netamx.OrderItem;');
                const data = Object.values(JSON.parse(JSON.stringify(results)));
                const result = data.map((r) => new orderItem_1.OrderItemMapperMySQL().mapFrom(r));
                return result;
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    getByIdOrderItem(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (connection_1.Connection.mySQL2Pool == null)
                    return null;
                const [results, fields] = yield connection_1.Connection.mySQL2Pool.query({
                    sql: `SELECT * from netamx.OrderItem where id=${id};`,
                });
                const data = Object.values(JSON.parse(JSON.stringify(results)));
                const entity = new orderItem_1.OrderItemMapperMySQL().mapFrom(data[0]);
                console.log(entity);
                return entity;
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
}
exports.OrderItemRepositoryMySQL = OrderItemRepositoryMySQL;
