const Order = require('../models/order/order');
const OrderDetail = require('../models/order/order_detail');
const Discount = require('../models/order/discount');
const { multipleMongooseToObject } = require('../../util/mongoose');
const https = require('https');
function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
    }
    return sorted;
}

class OrderController {
    // GET /product/discount
    // Discount(req, res, next) {
    //     Product.find({ discount: { $ne: 0, $ne: null } })
    //         .exec()
    //         .then((product) => res.json(product))
    //         .catch(next);
    // }
    // POST /order
    StoreOrder(req, res, next) {
        const order = new Order(req.body)
        order.save()
        .then(() => res.json(order._id))
        .catch()
    }
    // GET /discount/
    ShowDiscount(req, res, next) {
        Discount.find({})
            .exec()
            .then((discount) => res.json(discount))
            .catch(next)
    }
    // GET /order/checkout
    
    

    // GET /order/:id/order-detail
    ShowOderDetailByOrder(req, res, next) {
        OrderDetail.find({ order_id: req.params.id })
            .exec()
            .then((orderDetail) => res.json(orderDetail))
            .catch(next);
    }
    // GET /order/order-detail/:id
    GetOrderDetail(req, res, next) {
        OrderDetail.find({ _id: req.params.id })
            .exec()
            .then((orderDetail) => res.json(orderDetail))
            .catch(next);
    }
    StoreOrderDetail(req, res, next) {
        const order = new OrderDetail(req.body)
        order.save()
        .then(() => res.send('ok'))
        .catch()
    }
}
//đoạn code sắp xếp theo giá - sẽ chèn vào giao diện
// function sortProducts(sortOrder) {
//     axios.get('/products', {
//         params: {
//           sortBy: 'price',
//           sortOrder: sortOrder
//         }
//       })
//       .then((response) => {
//         console.log(response.data);
//         // Xử lý dữ liệu trả về và hiển thị danh sách sản phẩm đã sắp xếp
//       })
//       .catch((error) => {
//         console.log(error);
//       });
// }

module.exports = new OrderController();
// export default SiteController;
