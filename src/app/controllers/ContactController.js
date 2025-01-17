const ContactsRepository = require("../repositories/ContactsRepository");

class ContactController {
	// show all contacts
	async index(request, response) {
		const { orderBy } = request.query;
		const contacts = await ContactsRepository.findAll(orderBy);

		response.json(contacts);
	}
	// show a single contact
	async show(request, response) {
		const { id } = request.params;
		const contact = await ContactsRepository.findById(id);

		if (!contact) {
			return response.status(404).json({ error: "Contact not found" });
		}

		response.json(contact);
	}
	// create a new contact
	async store(request, response) {
		const { name, email, phone, category_id } = request.body;

		if (!name) {
			return response.status(400).json({ error: "Name is required" });
		}

		const contactExists = await ContactsRepository.findByEmail(email);

		if (contactExists) {
			return response
				.status(400)
				.json({ error: "This e-mail is already in use" });
		}

		const contact = await ContactsRepository.create({
			name,
			email,
			phone,
			category_id,
		});

		response.json(contact);
	}
	// update a contact
	async update(request, response) {
		const { id } = request.params;
		const { name, email, phone, category_id } = request.body;

		const contactExists = await ContactsRepository.findById(id);

		if (!contactExists) {
			return response.status(404).json({ error: "Contact not found" });
		}

		const contactByEmail = await ContactsRepository.findByEmail(email);

		if (contactByEmail && contactByEmail.id !== id) {
			return response
				.status(400)
				.json({ error: "This e-mail is already in use" });
		}

		const contact = await ContactsRepository.update(id, {
			name,
			email,
			phone,
			category_id,
		});

		response.json(contact);
	}
	// delete a contact
	async delete(request, response) {
		const { id } = request.params;
		const contact = await ContactsRepository.findById(id);

		if (!contact) {
			return response.status(404).json({ error: "Contact not found" });
		}

		await ContactsRepository.delete(id);

		response.sendStatus(204);
	}
}

module.exports = new ContactController();
