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
	let data = blogInfo.filter((blog) => {
		return Object.keys(req.query).every((key) => {
			return blog[key] == req.query[key];
		});
	});

	res.status(200).json({
		status: "Successful",
		data,
	});

	res.status(200).json(blogInfo);
});

// blogs passed with the id
app.get("/blogs/:id", (req, res) => {
	let blog = blogInfo.find((blog) => {
		return blog.id === req.params.id;
	});

	if (blog) {
		res.status(200).json({
			status: "Successful",
			data: blog,
		});
	} else {
		res.status(200).json({
			status: "Blog not found",
		});
	}
});

app.listen(PORT, () => {
	console.log(`PORT running on : ${PORT}`);
});
