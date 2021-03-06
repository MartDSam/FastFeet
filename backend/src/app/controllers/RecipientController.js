import Recipient from '../models/Recipient';
import Order from '../models/Order';

class RecipientController {
    async store(req, res) {
        const response = await Recipient.create(req.body);

        return res.json(response);
    }

    async update(req, res) {
        const { id: idRecipient } = req.params;

        const recipient = await Recipient.findByPk(idRecipient);

        if (!recipient) {
            return res.json({
                error: 'User do not exists',
            });
        }

        const response = await recipient.update(req.body);

        return res.json(response);
    }

    async show(req, res) {
        const { page = 1, perpage = 10 } = req.query;

        const recipients = await Recipient.findAndCountAll({
            where: {
                name: req.search,
            },
            offset: (page - 1) * perpage,
            limit: perpage,
            order: [['id', 'DESC']],
        });

        return res.json(recipients);
    }

    async delete(req, res) {
        const recipientDatabase = await Recipient.findByPk(req.params.id);

        if (!recipientDatabase) {
            return res.status(400).json({
                error: 'Recipient do not exists',
            });
        }

        const recipientOrders = await Order.findOne({
            where: {
                recipient_id: req.params.id,
            },
        });

        if (recipientOrders) {
            return res.status(406).json({
                error:
                    'This recipient has orders under your name and cannot be deleted.',
            });
        }

        recipientDatabase.destroy();

        return res.json('Recipient has deleted');
    }
}

export default new RecipientController();
