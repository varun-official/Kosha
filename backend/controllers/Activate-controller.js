/** @format */

class activateController {
  async activate(req, res) {
    res.json({ message: "done" });
  }
}

module.exports = new activateController();
