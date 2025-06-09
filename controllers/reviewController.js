const Review = require("../models/Review")

exports.createReview = async (req,res)=>{
    try{
        const {rating, comment} = req.body;
        const {id: bookId} = req.params
        const userId = req.user.userId

        const review = new Review({
            book: bookId,
            user: userId,
            rating, comment
        })

        await review.save();
        res.status(201).json({message:"Review Successfully submitted" ,review});
    }
    catch(error){
        if (error.code === 11000) { //This is  a MongoDB error code
            res.status(400).json({ error: 'You have already reviewed this book' });
        } else {
            res.status(500).json({ error: 'Failed to submit review' });
        }
    }
}

exports.updateReview = async (req,res) => {
    try{
        const review = await Review.findById(req.params.id) 
        
        if(!review) return res.status(404).json({ message: 'Review not found' });
        if (review.user.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        review.rating = req.body.rating ?? review.rating
        review.comment = req.body.comment ?? review.comment

        await review.save();
        res.json({message: "Review updated Successfully" ,review});
    }
    catch(error){
        res.status(500).json({ error: 'Failed to update review' });
    }
}

exports.deleteReview = async (req,res) => {
    try{
        const review = await Review.findById(req.params.id);
        if (!review) return res.status(404).json({ message: 'Review not found' });

        if (review.user.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        await review.deleteOne();
        res.json({ message: 'Review deleted successfully' });
    }
    catch(error){
        res.status(500).json({ error: 'Failed to delete review' });
    }
}