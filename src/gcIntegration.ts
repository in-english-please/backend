const vision = require('@google-cloud/vision');

/**
 * Takes an image and returns the text
 * @param fileUrl filepath to file (within bucket)
 * @returns text found within the image, formatted as Google Cloud defines
 */
const getText: any = async (filename: String) => {
    const annotatorClient = new vision.ImageAnnotatorClient();

    const bucketName = process.env.BUCKET_NAME;

    // Performs text detection on the gcs file
    // const [result] = await annotatorClient.textDetection(`gs://${bucketName}/${filename}`);
    const [result] = await annotatorClient.textDetection(filename);
    const detections = result.textAnnotations;
    console.log('Text:');
    detections.forEach((text: String) => console.log(text));
    return detections;
};

export { getText };
