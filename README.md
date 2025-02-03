# my-contacts API documentation

The my-contacts API allows you to create, delete, update and display contacts that you want to have.

## Endpoints

### Show users

**Endpoint:** `GET /contacts`
**Description:** Returns all registered users in your list of contacts.
**Example:**

```
[
	{
		"id": "1",
		"name": "John Doe",
		"email":"john_doe@mail.com,
		"category": "Discord"
	}
]
```
