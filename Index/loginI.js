const { loginSuccess,
    loginWrongPassword,
    loginWrongEmail,
    loginBlankEmail  } = require("../Function/loginF");

var LogPass01 = async function ()
{
    await loginSuccess.login();
    await loginWrongPassword.login();
    await loginWrongEmail.login();
    await loginBlankEmail.login();
}

LogPass01();