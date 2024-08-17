const requestConfigJson = {
	headers: {
		Authorization: `bearer ${localStorage.getItem("token")}` || "",
		"Content-type": "application/json",
	},
};

export default requestConfigJson;