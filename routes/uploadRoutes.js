const AWS = require('aws-sdk')
const keys = require('../config/keys')
const requireLogin = require('../middlewares/requireLogin')
const uuid = require('uuid/v1')

const s3 = new AWS.S3({
  accessKeyId: keys.accessKeyId,
  secretAccessKey: keys.secretAccessKey,
})

module.exports = app => {
  app.get('/api/upload', requireLogin, (req, res) => {
    const key = `${req.user.id}/${uuid()}.jpeg`

    s3.getSignedUrl('putObject', { //this string specifies what we want to get the presigned URL for( we want to upload a new file, new file is pbject)
      Bucket: 'my-blog-node-advanced',
      ContentType: 'image/jpeg',
      Key: key, // name of the file we are uploading
    }, (err, url) => res.send({key, url}))
  })
}