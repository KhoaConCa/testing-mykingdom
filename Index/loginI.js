const { loginSuccess,
    loginWrongPassword,
    loginWrongEmail,
    loginBlankEmail  } = require("../Function/loginF");

var LogPass01 = async function ()
{
    await loginSuccess.login();
    await loginBlankEmail.login();
    await loginWrongEmail.login();
    await loginWrongPassword.login();
}

LogPass01();