const express = require('express');
const router = express.Router();
const Album = require('../models/albums')



// Post an album
router.post('/', async (req, res) => {
    const album = new Album({
        albumName: req.body.albumName,
        artistNames: req.body.artistNames,
        releaseDate: req.body.releaseDate   
        })
    
        try {
            const newAlbum = await album.save();
            res.status(201).json(newAlbum)
        }
        catch(error) {
            res.status(400).json({ message : error.message});
        }
        
       
    

});

// Get a single album
router.get('/:id', getAlbum, (req, res) => {
    res.send(res.album);
    
});

// Get all albums
router.get('/', async (req, res) => {
    try {
        const albums = await Album.find();
        res.json(albums);   
    }
    catch(error) {
        res.status(500).json({message: error.message});
    }
});


// Patch one attribute of an album
router.patch('/:id', getAlbum, async (req, res) => {
    if(req.body.albumName !== null) {
        res.album.albumName = req.body.albumName;
    }

    if(req.body.artistNames !== null) {
        res.album.artistNames = req.body.artistNames;
    }

    if(req.body.releaseDate !== null) {
        res.album.releaseDate = req.body.releaseDate;
    }

    try {
        const updatedAlbum = await res.album.save();
        res.json(updatedAlbum);
    }
    catch(error) {
        res.status(500).json({ message: 'There was an error while updating the album'});
    }

});

// Delete an album
router.delete('/:id', getAlbum, async (req, res) => {
    try {
        await res.album.remove();
        res.json({ message: 'Album ' + res.album.albumName + ' has been deleted'});
    }
    catch(error) {
        res.status(500).json({ message: error.message});
    }


});

router.put('/:id', getAlbum, async (req, res) => {
    if(req.body.albumName != null && req.body.artistNames != null && req.body.releaseDate != null) {
            res.album.albumName = req.body.albumName;
            res.album.artistNames = req.body.artistNames;
            res.album.releaseDate = req.body.releaseDate;
        }
    else {
        res.json({ message: 'Please fill in all parameters'});
    }

    try {
        const updatedAlbum = await res.album.save();
        res.json(updatedAlbum);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

// Function used to get the ID of an album 
async function getAlbum (req, res, next) {
    let album;
    try {
        album =  await Album.findById(req.params.id)
        if(album === null) {
            return res.status(404).json({ message: 'Cannot find the album'}); 
        }
    }   catch(error) {
            res.status(500).json({ message : error.message});
        }
        res.album = album;
        next();
    }



module.exports = router;




