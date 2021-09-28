const {Router} = require('express');
const router = Router();
const {
    SERVER_ERROR_STATUS_CODE,
    MESSAGE_ERROR
} = require('../constants');
const auth = require('../middlewares/auth.middleware');
const settingsServices = require('../services/settingsServices');
const incubatorServices = require('../services/incubatorServices');

//Достаем настройки на каждый день инкубации по ID инкубации
router.get('/:incubatorId', auth, async (req, res) => {
    try {
        const {incubatorId} = req.params;
        const incubatorPromise = incubatorServices.getIncubator(incubatorId, req.user.userId);
        const settingsPromise = settingsServices.listSettings(incubatorId, req.user.userId);

        const [incubator, settings] = await Promise.all([
            incubatorPromise,
            settingsPromise
        ]);

        res.json({userId: req.user.userId, incubator, settings});
    } catch (e) {
        console.error(e);
        res.status(SERVER_ERROR_STATUS_CODE).json(MESSAGE_ERROR);
    }
});

module.exports = router;