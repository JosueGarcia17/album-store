const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.send('index get');
});

router.post('/', (req, res) => {
    res.send('index post');
});

router.put('/', (req, res) => {
    res.send('index put');
});

router.delete('/', (req, res) => {
    res.send('index delete');
});







module.exports = router;
