var validUrl = require('valid-url');
function isURLValid(url) {
    console.log("::: Running isURLValid :::", url);
    if (validUrl.isUri(url)){
        return true;
    } else {
        return false;
    }
}

export { isURLValid }
