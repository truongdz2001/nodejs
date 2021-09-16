"use strict";

/**
 * Get unique error field name
 */
const uniqueMessage = error => {
    let output;
    try{
        let fieldName = error.message.substring(
            error.message.lastIndexOf(".$") + 2,
            error.message.lastIndexOf("_1")
        );
        output = 
            fieldName.charAt(0).toUpperCase() +
            fieldName.slice(1) +
            "already exists";
    } catch(ex) {
        output = "Trường duy nhất đã tồn tại";
    }
    return output;
};

/**
 * Get the erroror message from error object
 */

exports.errorHandler = error => {
    let message = "";
    if(error.code) {
        switch(error.code) {
            case 11000:
            case 11001:
                message = uniqueMessage(error);
                break;
            default:
                message = "Đã xảy ra sự cố ";
        }
    } else {
        for(let errorName in error.errorors){
            if(error.errorors[errorName].message)
                message = error.errorors[errorName].message;
        }
    }
    return message;
};