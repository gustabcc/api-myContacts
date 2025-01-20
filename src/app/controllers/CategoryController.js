const CategoriesRepository = require("../repositories/CategoriesRepository");

class CategoryController {
	async index(request, response) {
		const categories = await CategoriesRepository.findAll();
		response.json(categories);
	}

	async store(request, response) {
		const { name } = request.body;

		if (!name) {
			return response.status(400).json({ error: "Name is required" });
		}

		const category = await CategoriesRepository.create({ name });
		response.json(category);
	}

	async update(request, response) {
		const { id } = request.params;
		const { name } = request.body;

		if (!name) {
			return response.status(400).json({ error: "Name is required" });
		}

		const nameCategory = CategoriesRepository.update(id, { name });

		response.json(nameCategory);
	}

	async delete(request, response) {
		const { id } = request.params;
		const category = await CategoriesRepository.delete(id);

		if (category.rowCount === 0) {
			return response.status(404).json({ error: "Category not found" });
		}

		response.sendStatus(204);
	}
}

module.exports = new CategoryController();
