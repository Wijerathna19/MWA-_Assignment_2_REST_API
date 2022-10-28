import Items from "../models/Item";
import cart_items from "../models/CartItems";

async  function cart_get (req, res){
  try {
    const allitems = await Items.find();
    res.json(allitems);
  } catch (error) {
    res.json({ message: error });
  }
};

async function cart_post (req, res) {
  const items = new cart_items({
    items: req.body.items,
    total: req.body.total,
    buyerId: req.body.buyerId,
  });

 
  items.save(function (err, cart) {
    console.log(cart);

    const ID = {
      id: cart["_id"],
    };
    console.log(ID);
    res.json(JSON.stringify(cart["_id"]));
  });
  
};

module.exports = { cart_get, cart_post };
