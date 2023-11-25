import chemicalDictionary from './python_chemicals/chemicals.json';

// use dictionary interface to format chemicalDictionary
interface Dictionary {
    [key: string]: string;
}

function translate(rawIngredientList: String) {
    // use the interface to format the chemicalDictionary into a usable form
    const chemicalDictionaryObject = chemicalDictionary as Dictionary;

    // removes all white space from google vision text, and makes the string lowercase
    rawIngredientList = rawIngredientList
        .replace(/(\r\n|\n|\r)/gm, ' ')
        .toLowerCase();

    // splits the ingredients into an array
    let ingredientArray = rawIngredientList.split(', ');

    // iterate through every element within the the ingredientArray list
    for (let i = 0; i < ingredientArray.length; i++) {
        // iterate through the chemicalDictionary
        for (let chem in chemicalDictionary) {
            // if chem includes any element within the ingredientArray, reassign the element at the index
            if (chem.includes(ingredientArray[i])) {
                ingredientArray[i] = chemicalDictionaryObject[chem];
            }
        }
    }

    return ingredientArray.join(', ');
}

export default translate;
