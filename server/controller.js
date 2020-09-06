
const { Router } = require('express');

const router = Router();

const Poll = require('./model/polls');

router.get('/polls', (req, res) => {

    Poll.find({})
        .sort({ 'date': -1 })
        .exec((err, polls) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                total: polls.length,
                polls
            });
        });
});


router.get(['/top/:limite','/top'], (req, res) => {

    let limite = Number(req.params.limite)?Number(req.params.limite): 3 ;

    Poll.find({})
        .sort({ 'total': -1 })
        .limit(limite && 3)
        .exec((err, polls) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                total: polls.length,
                polls
            });
        });
});



router.get('/polls/:id', (req, res) => {

    let id = req.params.id;

    Poll.findById(id, (err, pollBD) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err: {
                    mensaje: 'poll dont found'
                }
            });
        }

        if (!pollBD) {
            return res.status(400).json({
                ok: false,
                err: {
                    mensaje: 'Poll not exist'
                }
            });
        }

        res.json({
            ok: true,
            poll: pollBD
        });

    });


});


router.post('/polls/new', (req, res) => {

    let body = req.body;

    let poll = new Poll({
        question: body.question,
        option1: body.option1,
        option2: body.option2,
        option3: body.option3,
        option4: body.option4
    });

    poll.save((err, pollDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            poll: pollDB
        });

    });

});


router.put('/answer/:id', (req, res) => {

    let id = req.params.id;
    let option = req.body.option;     

    Poll.findById(id, (err, pollDB) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!pollDB) {
            return res.status(400).json({
                ok: false,
                id,
                option,
                err: {
                    message: 'poll not found'
                }
            });
        }

        
        let errMsg = "";


        switch (option) {
            case 'option1':
                if (pollDB.option1) {
                    pollDB.option1votes = pollDB.option1votes + 1
                    pollDB.total = pollDB.total + 1;
                } else
                    errMsg = "option 1 not exist";

                break;

            case 'option2':
                if (pollDB.option2) {
                    pollDB.option2votes = pollDB.option2votes + 1
                    pollDB.total = pollDB.total + 1;
                } else
                    errMsg = "option 2 not exist";

                break;

            case 'option3':
                if (pollDB.option3) {
                    pollDB.option3votes = pollDB.option3votes + 1
                    pollDB.total = pollDB.total + 1;
                } else
                    errMsg = "option 3 not exist";

                break;

            case 'option4':
                if (pollDB.option4) {
                    pollDB.option4votes = pollDB.option4votes + 1
                    pollDB.total = pollDB.total + 1;
                } else
                    errMsg = "option 4 not exist";

                break;
            
            default:

                return res.status(400).json({
                    ok: false,
                    id,
                    option,
                    err: {
                        message: 'option not found'
                    }
                });

        }

        if (errMsg !== "") {

            return res.status(400).json({
                ok: false,
                id,
                option,
                err: {
                    message: errMsg
                }
            });

        }

        pollDB.save((err, pollGuardado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }



            res.json({
                ok: true,
                poll: pollGuardado,
                id,
                option,
            });

        });




    });

});

module.exports = router;