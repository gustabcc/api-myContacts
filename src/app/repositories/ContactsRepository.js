const db = require("../..//database");

class ContactsRepository {
	async findAll(orderBy = "ASC") {
		const direction = orderBy.toUpperCase() === "DESC" ? "DESC" : "ASC";
		const rows = await db.query(
			`SELECT * FROM contacts ORDER BY name ${direction}`
		);
		return rows;
	}

	async findById(id) {
		const [row] = await db.query("SELECT * FROM contacts WHERE id = $1", [id]);
		return row;
	}

	async findByEmail(email) {
		const [row] = await db.query("SELECT * FROM contacts WHERE email = $1", [
			email,
		]);
		return row;
	}

	async create({ name, email, phone, category_id }) {
		const categoryExists = await db.query(
			"SELECT 1 FROM categories WHERE id = $1",
			[category_id]
		);

		if (categoryExists.rowCount === 0) {
			throw new Error("Categoria não encontrada");
		}

		const { rows } = await db.query(
			`INSERT INTO contacts(name, email, phone, category_id)
			VALUES($1, $2, $3, $4)
			RETURNING *`,
			[name, email, phone, category_id]
		);

		return rows;
	}

	async update(id, { name, email, phone, category_id }) {
		const uuid = id.trim();

		const categoryExists = await db.query(
			"SELECT 1 FROM categories WHERE id = $1",
			[category_id]
		);

		if (categoryExists.rowCount === 0) {
			throw new Error("Categoria não encontrada");
		}

		const { rows } = await db.query(
			`
				UPDATE contacts
				SET name = $1, email = $2, phone = $3, category_id = $4
				WHERE id = $5
				RETURNING *
			`,
			[name, email, phone, category_id, uuid]
		);

		try {
			if (rows.length === 0) {
				throw new Error("Contato não encontrado ou não foi possível atualizar");
			}
	
			return rows[0]; // Certifique-se de retornar o objeto correto
		} catch (error) {
				console.error(error)
				throw new Error("Erro ao tentar atualizar o contato")
		}
	}

	async delete(id) {
		const uuid = id.trim()
		const deleteOp = await db.query("DELETE FROM contacts WHERE id = $1", [uuid]);
		return deleteOp;
	}
}

module.exports = new ContactsRepository();
