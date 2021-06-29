const User = require('../models/User');

module.exports = {
  async check(req, res) {
    const { authId } = req
    const user = await User.findOne({ uid: authId })

    if (!user) {
      return res.status(400).send({ error: 'Usuário não existe' });
    }

    return res.json({
      teamId: user.team_id,
      userId: user._id,
      userUid: user.uid
    });
  }
}