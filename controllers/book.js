const Books = require("../schema/pdf.schema");

const getbook=async (req, res) => {
    try {
        const books = await Books.find();
        res.status(200).send({ msg: "success", data: books });

    } catch (error) {
        res.status(400).send({ msg: "fail to get", error: error });
    }
}

const addbook=async (req, res) => {
    try {
        const books = new Books(req.body);
        await books.save();
        res.status(200).send({ msg: "book added successfully", data: books });
    } catch (error) {
        res.status(400).send({ msg: "fail to add", error: error });
    }
};

const updatebook=async (req, res) => {
    try {
        await Books.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).send({ msg: "book updated successfully" });
    } catch (error) {
        res.status(400).send({ msg: "fail to update", error: error });
    }
};

const deletebook=async (req, res) => {
    try {
        await Books.findByIdAndDelete(req.params.id);
        res.status(200).send({ msg: "book deleted successfully" });
    } catch (error) {
        res.status(400).send({ msg: "fail to delete", error: error });
    }
};

module.exports={
    getbook,
    addbook,
    updatebook,
    deletebook,
}