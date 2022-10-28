import _express from 'express'
import _randomatic from 'randomatic'

const generate_otp = (req) =>{

    var otp = randomizer('0' , 5);
    
    return Promise.resolve(otp);
}

module.exports.get_OTP = generate_otp;
