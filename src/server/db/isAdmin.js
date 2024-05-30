const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkAdmin(req, res, next) {
  try {
    const user = await prisma.User.findUnique({
      where: { id: req.user.id }
    });

    if (user && user.isAdmin) {
      next();
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
}

module.exports = checkAdmin;
