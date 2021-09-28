const {Router} = require('express');
const router = Router();
const pdfMake = require('pdfmake');
const MemoryStream = require('memorystream');
const auth = require('../middlewares/auth.middleware');
const downloadServices = require('../services/downloadServices');
const incubatorServices = require('../services/incubatorServices');
const settingsServices = require('../services/settingsServices');

const {
    SERVER_ERROR_STATUS_CODE,
    MESSAGE_ERROR
} = require('../constants');

//Выгрузка PDF
router.get('/:id', auth, async (req, res) => {
    try {
        const incubatorPromise = incubatorServices.getIncubator(req.params.id, req.user.userId);
        const settingsPromise = settingsServices.listSettings(req.params.id, req.user.userId);

        const [incubator, settings] = await Promise.all([
            incubatorPromise,
            settingsPromise
        ]);

        const docDefinition = downloadServices.createDocDefinition(settings, incubator);

        const fonts = {
            Roboto:
                {
                    normal: __dirname + '/../fonts/times.ttf',
                    bold: __dirname + '/../fonts/times.ttf',
                }
        };
        const printer = new pdfMake(fonts);
        const doc = printer.createPdfKitDocument(docDefinition, {bufferPages: true});
        let buffers = [];
        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => {
            const pdfData = Buffer.concat(buffers);
            res.writeHead(200, {
                'Content-Length': Buffer.byteLength(pdfData),
                'Content-Type': 'application/pdf',
                'Content-disposition': 'attachment;filename=test.pdf',
            })
                .end(pdfData);
        });
        const memStream = new MemoryStream();
        doc.pipe(memStream);
        doc.end();
    } catch (e) {
        console.error(e);
        res.status(SERVER_ERROR_STATUS_CODE).json(MESSAGE_ERROR);
    }
});

module.exports = router;