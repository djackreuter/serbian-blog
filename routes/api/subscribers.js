const express = require('express');
const router = express.Router();
const { Subscriber } = require('../../models/Subscriber');
const { validateSubscribeInput } = require('../../validation/subscribe');
const passport = require('passport');

/**
 * @route GET api/subscribe/count
 * @desc count num of subscribers
 * @access private
 */
router.get('/count', passport.authenticate('jwt', { session: false }), 
    async (req, res) => {
        try {
            const subs = await Subscriber.find({});
            return res.json(subs.length);
        } catch (err) {
            return res.status(400).json(err);
        }

    });

/**
 * @route POST api/subscribe
 * @desc add a new subscriber
 * @access public
 */
router.post('/subscribe', async (req, res) => {
    const { errors, isValid } = validateSubscribeInput(req.body);
    if (!isValid) {
        console.log('not valid');
        return res.status(400).json(errors); 
    }
    const { firstName, lastName, email } = req.body;
   
    try {
        let subscriber = await Subscriber.findOne({ email });
        if (subscriber) {
            console.log('subscriber exists');
            return res.status(400).json({ error: 'You are already subscribed!' });
        }

        console.log('create new sub');
        const sub = new Subscriber({ firstName, lastName, email });
        
        console.log('save new sub');
        const newSub = await sub.save();

        console.log('return new sub');
        return res.json(newSub);

    } catch (err) {
        console.log('error thrown');
        return res.status(400).json(err); 
    }

});


/**
 * @route DELETE api/subscribe/id
 * @desc remove a subscriber
 * @access public
 */
router.delete('/unsubscribe/:id', async (req, res) => {
    try {
        await Subscriber.findByIdAndDelete(req.params.id);
        return res.json({ success: 'You have unsubscribed'});
    } catch (err) {
        return res.status(400).json(err);
    }
});

module.exports = router;
