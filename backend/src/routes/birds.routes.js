const {Router} = require('express');
const router = Router();
const {
    SERVER_ERROR_STATUS_CODE,
    MESSAGE_ERROR
} = require('../constants');
const auth = require('../middlewares/auth.middleware');
const birdsServices = require('../services/birdsServices');

//Достаем список птиц
router.get('/', auth, async (req, res) => {
    try {
        const birds = await birdsServices.listBirds();
        res.json(birds);
    } catch (e) {
        console.error(e);
        res.status(SERVER_ERROR_STATUS_CODE).json(MESSAGE_ERROR);
    }
});

module.exports = router;