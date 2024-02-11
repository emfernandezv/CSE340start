    
    function testPw(input){
        let message = "";
        if('/.{12}/g'.exec(pwString) == false) message += "Your password must be 12 characters in length. ";
        if('/[A-Z]+/g'.exec(pwString) == false) message += "Your password must contain at least one capital letter. ";
        if('/[\d]+/g'.exec(pwString) == false) message += "Your password must contain at least one roman numeral. ";
        if('/[`~!@#$%^&\*()\-+={}|\\\[\];\'\":,\.<>\?\/\_]/g'.exec(pwString) == false) message += "Your password must contain at least one special character. ";
        return message;
    }