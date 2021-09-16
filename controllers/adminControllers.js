const Message = require('../models/messages');

exports.getAdmin = (req, res) => {
    Message.find({}, (err, foundItems) => {
        res.render('admin', { messages: foundItems });
    });
};

exports.postDeleteMessage = (req, res) => {
    const id = req.params.id;
    Message.findByIdAndDelete(id, (err) => {
        if (err) {
            console.log(err);
            res.status(400).end();
        } else {
            res.status(200).end();
        }
    })
}