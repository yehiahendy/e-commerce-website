exports.userSignupValidator = (req,res,next)  => 
{ 
    req.check("name","Email is required").notEmpty();
    req.check("email","email must be between 3 - 32 charcacters").matches(/.+\@.+\..+/)
    .withMessage("Error :  for example abc@xyz.com")
    .isLength({
        min : 3,
        max : 32
    });
    req.check("password","Password is required ").notEmpty()
    .matches(/\d/)
    .withMessage("password must contain at least one digit")
    .isLength({
        min : 3,
        max : 32 
    })
    .withMessage("password lenght should be at least 3 ");
    const errors = req.validationErrors();
    if (errors)
    {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({error : firstError});
    }
    next();
};

