export const cleanFooter = (text) => {

    return text.replace(/[^A-Za-z\s]/g, '');

}

export function cleanHeader(text) {
    
    let cleanedText = text.replace(/[^A-Za-z0-9\s{}]/g, '');
         
    const hasPattern = /{{1}}/.test(cleanedText);
    
    // cleanedText = cleanedText.replace(/(\{\{\d+\}\})/g, (match) => {
    //     return match === '{{1}}' ? '{{1}}' : '';
    // });

    // if (!hasPattern) {
    //     cleanedText += '{{1}}';
    // }

    return cleanedText;
}


export const cleanBody = () => {
    
    return text.replace(/[^A-Za-z\s]/g, '');

}