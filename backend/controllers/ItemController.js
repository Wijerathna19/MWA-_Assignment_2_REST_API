import item from "../models/Item"

async function seller_id (req, res) {
  var id = req.params.sellerID;

  item.find({ sellerID: id })
    .then((item) => {
      item.aggregate([
        { $match: { sellerID: id } },
        { $group: { _id: null, amount: { $sum: "$itemCount" } } },
      ]).then((res) => {
        item.countDocuments({ sellerID: id }, function (error, b) {
          return b;
        }).then((b ) => {
          const amount = res[0].amount;
          res.json({ item, b, amount });
          console.log(amount);
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });
};


async function item_id (req, res) {
  var item_ID = req.params.item_ID;

  item.find({ _id: item_ID })
    .then((items) => {
      res.json(items);
    })
    .catch((err) => {
      console.log(err);
    });
};


async function delete_item (req, res)  {
  var item_id = req.params.itemID;
  await item.findByIdAndDelete(item_id)
    .then(() => {
      res.json({ status: 200 });
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = { seller_id, item_id, delete_item };
