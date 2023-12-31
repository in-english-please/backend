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

// removes parentheses and the words within the parentheses present within some ingredients
function removeParentheses(inputString: String) {
    let outputString = '';
    let depth = 0;

    for (let i = 0; i < inputString.length; i++) {
        const char = inputString[i];

        if (char === '(' || char === '[') {
            depth++;
        } else if (char === ')' || char === ']') {
            depth--;
        } else if (depth === 0) {
            outputString += char;
        }
    }

    return outputString.trim();
}

// conditionally formats output
function checkIngredients(rawList: String) {
    let ingredientList;

    // removes the parentheses from the raw string
    rawList = removeParentheses(rawList);

    if (rawList.includes('ingredients:')) {
        // splits the ingredients into two halves: everything before the keyword "ingredients:" and everything after
        ingredientList = rawList.split('ingredients:');

        // make ingredientArray equal to everything after the word "ingredients:" and split it for individual elements
        ingredientList = ingredientList[1].split(', ');
    } else {
        ingredientList = rawList.split(', ');
    }

    console.log(ingredientList);

    // finds the index of the first element in the ingredient list that includes a period, which would be the last ingredient of the list
    const lastIngredient = ingredientList.findIndex((x) => x.includes('.'));

    // if ingredient ending in period is found
    if (lastIngredient != -1) {
        // cut everything occuring after the period out of the final item in the ingredients list
        ingredientList[lastIngredient] =
            ingredientList[lastIngredient].split('.')[0];
        ingredientList = ingredientList.slice(0, lastIngredient + 1);
    }

    return ingredientList;
}

function translate(rawIngredientList: String) {
    // use the interface to format the chemicalDictionary into a usable form
    const chemicalDictionaryObject = chemicalDictionary as Dictionary;

    // removes all white space from google vision text, and makes the string lowercase
    rawIngredientList = rawIngredientList
        .replace(/(\r\n|\n|\r)/gm, ' ')
        .toLowerCase();

    console.log(rawIngredientList);
    // use helper method to declare ingredientArray
    let ingredientArray = checkIngredients(rawIngredientList);

    // holds the original ingredient name and the "translation"
    let updatedIngredientArray = [];

    // iterate through every element within the the ingredientArray list
    for (let i = 0; i < ingredientArray.length; i++) {
        let maxScore = 0;
        // trims every element within the ingredientArray to remove trailing and leading spaces
        ingredientArray[i] = ingredientArray[i].trim();

        // iterate through the chemicalDictionary
        for (let chem in chemicalDictionary) {
            let score =
                wordsFound(chem, ingredientArray[i]) *
                wordsFound(ingredientArray[i], chem);
            // if the similarity between the two strings chem and ingredientArray[i] is greater than or equal to 50%, we translate it
            if (score >= 0.5 && score > maxScore) {
                // pushes an object containing the original name of the ingredient and the translation of that ingredient
                updatedIngredientArray.push({
                    originalName: ingredientArray[i],
                    translation: chemicalDictionaryObject[chem],
                });

                maxScore = score;
            }
        }
    }

    // returns the original list of ingredients, as well as the key/value translation pairs
    return {
        originalIngredientsArray: ingredientArray,
        translatedArray: updatedIngredientArray,
    };
}

export default translate;
