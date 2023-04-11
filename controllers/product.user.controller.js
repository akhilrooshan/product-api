
exports.userfindOne = async (req, res) => {
    try {

        const val = req.params.id;
        const data = await db.findAll({ where: { id: val, userid: req.user.id } })
        return await res.json({ data })
    } catch (error) {
        return await res.status(500).send(error.message)
    }
};
//update the specific product by id
exports.userUpdate = async (req, res) => {
    try {
        const val = req.params.id;
        const data = await db.update(req.body, { where: { id: val, userid: req.user.id } })
        return await res.json({ data })
    } catch (error) {
        return await res.status(500).send(error.message)
    }
};
//delete the specific product by id
exports.userDelete = async (req, res) => {
    const varId = req.params.id;
    try {
        const data = await db.destroy({ where: { id: val, userid: req.user.id } });
        res.status(200).json(data);
    } catch (error) {
        return await res.status(500).send(error.message)
    }
};

exports.getAllUser = async (req, res) => {
    try {
        const data = await db.findAll({ where: { userid: req.user.id } })

        return await res.json({ data })
    } catch (error) {
        return await res.status(500).send(error.message)
    }
};