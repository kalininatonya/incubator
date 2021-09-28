const {Router} = require('express');
const router = Router();
const {
    SERVER_ERROR_STATUS_CODE,
    CREATED_STATUS_CODE,
    MESSAGE_ERROR,
    SUCCESS_STATUS_CODE,
    INCUBATOR_REMOVAL_MESSAGE_SUCCESSFUL,
} = require('../constants');
const auth = require('../middlewares/auth.middleware');
const incubatorServices = require('../services/incubatorServices');
const settingsServices = require('../services/settingsServices');

//Достаем incubator по id
router.get('/:id', auth, async (req, res) => {
    try {
        const result = await incubatorServices.getIncubator(req.params.id, req.user.userId);

        res.json(result);
    } catch (e) {
        console.error(e);
        res.status(SERVER_ERROR_STATUS_CODE).json(MESSAGE_ERROR);
    }
});


//Достаем список позиций для инкубации
router.get('/', auth, async (req, res) => {
    try {
        const result = await incubatorServices.listIncubators(req.user.userId);

        res.json(result);
    } catch (e) {
        console.error(e);
        res.status(SERVER_ERROR_STATUS_CODE).json(MESSAGE_ERROR);
    }
});

//Создание инкубатора с настройками инкубации на каждый день
router.post('/add', auth, async (req, res) => {
    try {
        const incubator = await incubatorServices.addIncubator(req.body, req.user.userId);
        //Сохраняем в БД настройки для конкретного инкубатора
        await settingsServices.addSettings(incubator, req.user.userId);
        //Достаем настройки на конкретный день(текущий-сегодняшний)
        const setting = await settingsServices.getDaySetting(incubator.id, req.user.userId);

        res.status(CREATED_STATUS_CODE).json({...incubator, ...setting});
    } catch (e) {
        console.error(e);
        res.status(SERVER_ERROR_STATUS_CODE).json(MESSAGE_ERROR);
    }
});

//Редактирование инкубатора
router.put('/edit/:id', auth, async (req, res) => {
    try {
        const incubator = await incubatorServices.editIncubator(req.body, req.params.id, req.user.userId);
        //Обновляем в БД настройки для конкретного инкубатора
        await settingsServices.editSettings(incubator, req.user.userId);
        //Достаем настройки на конкретный день(текущий-сегодняшний)
        const setting = await settingsServices.getDaySetting(incubator.id, req.user.userId);

        res.status(SUCCESS_STATUS_CODE).json({...incubator, ...setting});
    } catch (e) {
        res.status(SERVER_ERROR_STATUS_CODE).json(MESSAGE_ERROR);
    }
});

//Удаление инкубатора
router.delete('/delete/:id', auth, async (req, res) => {
    try {
        await Promise.all([
            incubatorServices.deleteIncubator(req.params.id, req.user.userId),
            settingsServices.deleteSettings(req.params.id, req.user.userId)
        ]);

        res.status(SUCCESS_STATUS_CODE).json(INCUBATOR_REMOVAL_MESSAGE_SUCCESSFUL);
    } catch (e) {
        res.status(SERVER_ERROR_STATUS_CODE).json(MESSAGE_ERROR);
    }
});

module.exports = router;