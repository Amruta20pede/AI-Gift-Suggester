/*const fetch = require('node-fetch');
const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/download-image', async (req, res) => {
    const imageUrl = req.query.imageUrl;
    const response = await fetch(imageUrl);
    const buffer = await response.buffer();

    // Set appropriate headers for download
    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Content-Disposition', `attachment; filename=image.jpg`);
    
    // Send the image buffer as the response
    res.send(buffer);
});

module.exports = router;
*/

import('node-fetch').then(({ default: fetch }) => {
    const express = require('express');
    const router = express.Router();

    router.get('/download-image', async (req, res) => {
        const imageUrl = req.query.imageUrl;
        const response = await fetch(imageUrl);
        const buffer = await response.buffer();

        // Set appropriate headers for download
        res.setHeader('Content-Type', 'image/jpeg');
        res.setHeader('Content-Disposition', `attachment; filename=image.jpg`);
        
        // Send the image buffer as the response
        res.send(buffer);
    });

    module.exports = router;
}).catch(err => {
    console.error('Error importing node-fetch:', err);
});
