const vision = require('@google-cloud/vision');

/**
 * Takes an image and returns the text
 * @param fileUrl filepath to file (within bucket)
 * @returns text found within the image, formatted as Google Cloud defines
 */
const getText: any = async (fileUrl: String) => {
    const annotatorClient = new vision.ImageAnnotatorClient();

    const req = {
        image: {
            source: {
                imageUri: fileUrl,
            },
        },
        features: [
            {
                type: 'DOCUMENT_TEXT_DETECTION',
            },
        ],
    };
    // square bracket notation extracts the first element of an array (or first key in a dict?)
    const [result] = await annotatorClient.batchAnnotateImages({
        requests: [req],
    });

    // no text detected
    if (!result.responses[0].fullTextAnnotation) return '';

    return result.responses[0].fullTextAnnotation.text;
};

export { getText };
