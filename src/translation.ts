import chemicalDictionary from './python_chemicals/chemicals.json';

// use dictionary interface to format chemicalDictionary
interface Dictionary {
    [key: string]: string;
}

// finds the percentage of words in a that are also in b
function wordsFound(a: String, b: String) {
    // arrays of the words in strings a and b
    let aWords = a.split(' ');
    let bWords = b.split(' ');

    // the number of words present within a that are also present within b
    let numAWords = 0;

    for (let aWord of aWords) {
        if (bWords.find((x) => x == aWord)) {
            numAWords++;
        }
    }

    // returns the percentage of words present within a that are also within b
    return numAWords / aWords.length;
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
            // if the similarity between the two strings chem and ingredientArray[i] is greater than or equal to 50%, we translate it
            if (
                wordsFound(chem, ingredientArray[i]) *
                    wordsFound(ingredientArray[i], chem) >=
                0.5
            ) {
                ingredientArray[i] = chemicalDictionaryObject[chem];
            }
        }
        console.log(ingredientArray);
    }

    return ingredientArray.join(', ');
}

export default translate;
