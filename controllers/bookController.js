const Books = require("../models/Books");

exports.createBook = async(req,res) => {
    try{
        const { title, author, genre, description } = req.body;
        const book = new Books({
            title,
            author,
            genre,
            description,
            createdBy: req.user.userId
        })

        await book.save()
        res.status(201).json({message: "Book created successfully", book});
    }
    catch(error){
        res.status(500).json({ error: 'Failed to create book' });
    }
}

exports.getAllBooks = async(req,res) => {
    try{
        const {author, genre, page = 1, limit = 10} = req.query;
        const filter = {};

        if(author) filter.author = new RegExp(author, 'i');
        if(genre) filter.genre = genre;

        const books = await Books.find(filter)
            .skip((page - 1) * limit)
            .limit(parseInt(limit));
        
        res.json(books);
    }
    catch(error){
        res.status(500).json({ error: 'Failed to get books' });
    }
}

exports.getBookbyId = async(req,res) => {
    try{

        const book = await Books.findById(req.params.id).lean()
        if(!book) res.status(404).json({message: "No book found related to this id"})
        
        res.status(200).json(book)
    }
    catch(error){
        res.status(500).json({ error: 'Failed to get book' });
    }
    
}