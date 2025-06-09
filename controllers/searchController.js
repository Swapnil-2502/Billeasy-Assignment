const Book = require('../models/Books')

exports.searchBooks = async(req,res)=> {
    try{
        const {query, page = 1, limit = 10} = req.query

        if (!query) {
            return res.status(400).json({ message: 'Search query is required' });
        }

        const regex = new RegExp(query, 'i');

        const books = await Book.find({
            $or: [
                { title: regex },
                { author: regex }
            ]
        })
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
        
        res.json(books)
    }
    catch(error){
        res.status(500).json({ error: 'Failed to search books' });
    }
}