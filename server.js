app.use(express.json());

app.param('collectionName'
    , function (req, res, next, collectionName) {
        req.collection = db.collection(collectionName);
        return next();
    });