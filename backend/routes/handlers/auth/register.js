const bcrypt = require('bcrypt');
const { User } = require('../../../models');

module.exports = async (req, res) => {
    const { body } = req;

    // Validation User Input
    if (!body.name || !body.email || !body.password || !body.role)
        return res.status(400).json({
            message: "Name, email, and password must be provided"
        });

    try {
        // Check if the email already exists
        const isEmailUsed = await User.findOne({ email: body.email });

        if (isEmailUsed) {
            return res.status(400).json({
                message: "Email has been used"
            });
        }

        // Biar password nya mengalami enkripsi
        const password = await bcrypt.hashSync(body.password, 10);

        const user = await User.create({
            name: body.name,
            email: body.email,
            role: body.role,
            password
        });

        return res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};
