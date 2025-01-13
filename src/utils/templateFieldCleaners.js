export function cleanTitle(text){

    let cleanedTitle = text.replace(/[\s\-\/]/g, '_');
    
    cleanedTitle = cleanedTitle.replace(/[áàãâä]/g, '');
    cleanedTitle = cleanedTitle.replace(/[éèêë]/g, '');
    cleanedTitle = cleanedTitle.replace(/[íìîï]/g, '');
    cleanedTitle = cleanedTitle.replace(/[óòôõö]/g, '');
    cleanedTitle = cleanedTitle.replace(/[úùûü]/g, '');
    cleanedTitle = cleanedTitle.replace(/[ç]/g, '');

    cleanedTitle = cleanedTitle.replace(/_+/g, "_")

    return cleanedTitle
}


export function cleanHeader(text) {
    
    let cleanedText = text.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ0-9\s{}?]/g, '');
         
    
    cleanedText = cleanedText.replace(/\{\{\d+\}\}/g, (match) => {
        return match === '{{1}}' ? match : '';
    });

    
    const patternFirstOccurrenceIndex = cleanedText.indexOf('{{1}}');
    if (patternFirstOccurrenceIndex !== -1) {
        
        cleanedText = cleanedText.replace(/{{1}}/g, (match, offset) => (offset === patternFirstOccurrenceIndex ? match : ''));
    }

    return cleanedText;
}


export const cleanBody = () => {
    
    return text.replace(/[^A-Za-z\s]/g, '');
    
}


export const cleanFooter = (text) => {

    return text.replace(/[^A-Za-z\s]/g, '');

}