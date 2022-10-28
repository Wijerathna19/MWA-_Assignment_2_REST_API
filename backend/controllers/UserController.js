import { findOne, find } from "../models/Seller";
import { findOne as _findOne } from "../models/Buyer";

import { compare } from "bcrypt";


// buyer login -------------------------------------------
async function buyer_login(request, response) {

  let user_name = request.body.username;
  let passwd = request.body.password;

  const user = await _findOne({ user_name: user_name });

  if (user) {
    const auth = await compare(passwd, user.passwd);

    if (auth === false) {
      res.json("invalid credentials!");
    } else {
      res.json({ user, status: 200 });
    }

  } else {
    return res.status(404).json("User Doesn't Exists!");
  }

};
// end buyer login ---------------------------------------


// seller login -------------------------------------------
async function seller_login(request, response) {

  let user_name = request.body.username;
  let passwd = request.body.password;

  const user = await findOne({ user_name: user_name });

  if (user) {
    const auth = await compare(passwd, user.passwd);

    if (auth === false) {
      res.json("invalid credentials!");
    } else {
      res.json({ user, status: 200 });
    }

  } else {
    return res.status(404).json("User Doesn't Exists!");
  }

};
// end seller login --------------------------------------


// get seller --------------------------------------------
function get_seller(request, response) {
  let seller_id = request.params.sellerID;

  find({ _id: seller_id })
    .then((seller) => {
      response.json(seller);
    });

};
// end get seller----------------------------------------


export default { buyer_login, seller_login, get_seller };
