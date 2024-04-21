 const restrictTo = (...roles) => {
     return (req, res, next) => {
       
         // check if user has the specified role
        //  if (req.user && req.user.role === role) {
          if (roles.includes(req.user.role)) {
             // if user has the specified role, allow access to the endpoint
             return next();
         } else {
             
           // if user does not have the specified role
           return res
             .status(403)
             .json({
               message: "You do not have permission to perform this action",
             });
         }
   };
};
 
module.exports = { restrictTo };