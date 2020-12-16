const sendResponse = require("./helpers/sendResponse.js");
const AppError = require("./helpers/appError.js");
const sendError = require("./helpers/sendError");

const express = require("express");
const fs = require("fs");
const path = require("path");
// install express
const app = express();

// middle part
app.use(express.json());

const PORT = 4000;
const BLOGS = path.join(__dirname, "data", "blogs.json");
const blogInfo = JSON.parse(fs.readFileSync(BLOGS, "utf-8"));

// get all the blogs
app.get("/blogs", (req, res) => {
	if (req.query) {
		let data = blogInfo.filter((blog) => {
			return Object.keys(req.query).every((key) => {
				return (
					blog[key]
						.trim()
						.replace(/[#_-\s]/g, "")
						.toLowerCase() ===
					req.query[key]
						.trim()
						.replace(/[#_-\s]/g, "")
						.toLowerCase()
				);
			});
		});
		if (data < 1) {
			sendError(404, "Unsuccessful", "Blog not found", req, res);
		} else {
			sendResponse(200, "Successful", data, req, res);
		}
	} else {
		sendResponse(200, "Successful", blogInfo, req, res);
	}
});

// blogs passed with the id
app.get("/blogs/:id", (req, res) => {
	let blog = blogInfo.find((blog) => {
		return blog.id === req.params.id;
	});
	if (blog) {
		sendResponse(200, "Successful", blog, req, res);
	} else {
		sendError(404, "Unsuccessful", "Blog not found", req, res);
	}
});

app.listen(PORT, () => {
	console.log(`PORT running on : ${PORT}`);
});
