const {OAuth2Client, UserRefreshClient} = require('google-auth-library')
const client = new OAuth2Client("1080247718906-i35pll533d3drvhk0s2vpqjghs4217qt.apps.googleusercontent.com")
const User = require('../models/User')
const jwt= require('jsonwebtoken')
const ash = require('express-async-handler')


const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });
};
  
const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user._id);

    res.cookie('jwt', token, {
        expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
    });

    // Remove password from output
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
        user
        }
});
};

exports.googlelogin= ash(async (req,res)=>{
    const {tokendId} = req.body;
    await client.verifyIdToken({idToken:tokendId, audience: "1080247718906-i35pll533d3drvhk0s2vpqjghs4217qt.apps.googleusercontent.com"}).then(response=>{
        const {email_verified, name,email}= response.getPayload()
        console.log(response.getPayload())
        if(email_verified){
            User.findOne({email}).exec((err,user)=>{
                if(err){
                    return res.status(400).json({
                        error:"Something went wrong"
                    })
                }else{
                    if(user){
                        createSendToken(user, 200, req, res);
                    }else{
                        let password = email+name+"123";
                        let newUser  = new User({name,email,password});

                        newUser.save((err,data)=>{
                            if(err){
                                return res.status(400).json({
                                    error :"Something went wrong.."
                                })
                            }
                            console.log('saved user')
                            createSendToken(user, 200, req, res);
                            })
                            
                        
                    }
                }
            })
        }
    })
   
})
exports.logout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true
    });
    res.status(200).json({ status: 'success' });
  };

exports.protect = ash(async (req, res, next) => {
    // 1) Getting token and check of it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
  
    if (!token) {
      return next(
        new AppError('You are not logged in! Please log in to get access.', 401)
      );
    }
  
    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  
    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError(
          'The user belonging to this token does no longer exist.',
          401
        )
      );
    }
  
    // 4) Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next(
        new AppError('User recently changed password! Please log in again.', 401)
      );
    }
  
    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
  });  

  exports.restrictTo = (...roles) => {
    return (req, res, next) => {
      // roles ['admin', 'lead-guide']. role='user'
      if (!roles.includes(req.user.role)) {
        return next(
          new AppError('You do not have permission to perform this action', 403)
        );
      }
  
      next();
    };
  };
  