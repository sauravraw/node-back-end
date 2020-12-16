const sendError = (statusCode, status, data, req, res) => {
	res.status(statusCode).json({
		status: status,
		data: data,
	});
};

module.exports = sendError;
