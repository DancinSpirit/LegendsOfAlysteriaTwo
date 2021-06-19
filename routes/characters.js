const router = require('express').Router();
const ctrl = require("../controllers");

router.get('/', ctrl.characters.index);
router.get('/:id', ctrl.characters.show);
router.post('/', ctrl.characters.create);
router.put('/:id', ctrl.characters.update);
router.delete('/:id', ctrl.characters.destroy);

module.exports = router;