const express = require('express')
const router = express.Router()
const multer = require('multer')
const cloudinary = require('../config/cloudinary')
const Upload = require('../models/Upload')
const auth = require('../middleware/auth')

const storage = multer.memoryStorage()

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only images allowed'))
    }
    cb(null, true)
  }
})

router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' })

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'nexe-agent' },
        (err, result) => err ? reject(err) : resolve(result)
      )
      stream.end(req.file.buffer)
    })

    const doc = await Upload.create({
      url:        result.secure_url,
      public_id:  result.public_id,
      uploadedBy: req.user.id
    })

    res.json({ message: 'Uploaded successfully', url: doc.url })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/', auth, async (req, res) => {
  try {
    const uploads = await Upload.find({ uploadedBy: req.user.id })
    res.json(uploads)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router