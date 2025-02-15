const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')
const { formatFileName } = require('../middleware/uploadMiddleware')
const ResponseHandler = require('../utils/responseHandler')

const s3Client = new S3Client({
    region: 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
})

const uploadFile = async (file) => {
    try {
        const formattedFileName = formatFileName(file.originalname)
        const fileName = `fotos/${formattedFileName}`

        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileName,
            Body: file.buffer,
            ContentType: file.mimetype
        }

        const command = new PutObjectCommand(params)
        await s3Client.send(command)

        const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${fileName}`
        
        return ResponseHandler.success({
            url: fileUrl,
            key: fileName,
            originalName: file.originalname,
            formattedName: formattedFileName
        }, 'Archivo subido exitosamente')
    } catch (error) {
        return ResponseHandler.error('Error al subir el archivo: ' + error.message)
    }
}

module.exports = {
    uploadFile
}