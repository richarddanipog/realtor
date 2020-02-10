
//named export
//you'll import with {}
export const field = ({name, value= '',isRequired = false, minLength = 0, pattern = '',imagesLength=0}) => {

    const settings = {
        name, 
        value,
        errors: [],
        validations:{}
    }

    if(isRequired){
        settings.validations.required = true;
    }
    if(minLength){
        settings.validations.minLength = minLength;
    }
    if(pattern){
        settings.validations.pattern = pattern;
    }
    if(imagesLength){
        settings.validations.imagesLength = imagesLength;
    }


    return settings;
}

export const PI = 3.14;

//The default export
//You'll import as usual
export default (name, value,validations) => {
    const errors = [];
    
    //required validation
    if(validations.required && required(value)){
        // const errors = [`${name} is required`];
        errors.push(`${name} is required`);                
    }

    if(validations.minLength && minLength(value, validations.minLength)){
        errors.push(`${name} should be no less than ${validations.minLength} characters`);
    }

    if(validations.pattern && pattern(value, validations.pattern)){
        errors.push(`${name} invalid`);
    }
    if(validations.imagesLength && imagesLength(value, validations.imagesLength)){
        errors.push(`${name} should be no less than ${validations.minLength} images`);
    }
    return errors;
}

const required = value => !value;

const minLength = (value, min) => value.length < min;

const pattern = (value, pattern) => !pattern.test(value);

const imagesLength = (value, min) => value.length < min;