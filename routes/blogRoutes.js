const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const  cleanHash  = require('../middlewares/cleanCache')

const Blog = mongoose.model('Blog');

module.exports = app => {
  app.get('/api/blogs/:id', requireLogin, async (req, res) => {
    const blog = await Blog.findOne({
      _user: req.user.id,
      _id: req.params.id
    });

    res.send(blog);
  });

  app.get('/api/blogs', requireLogin, async (req, res) => {
    const blogs = await Blog
        .find({_user: req.user.id})
        .cache({key: req.user.id})

    res.send(blogs)

    // const redis = require('redis')
    // const redisURL = 'redis://127.0.0.1:6379'
    // const client = redis.createClient(redisURL)
    // const util = require('util')
    // client.get = util.promisify(client.get) // it helps us to return a promise as client.get is not a promise initialy
    //
    // //Do we have any cached data in redis related to this query
    // const cachedBlogs = await client.get(req.user.id) //cachedBlogs is JSON FILE
    //
    // //if yes, then respond to the request right away and return
    // if(cachedBlogs){
    //   console.log('SERVING FROM CACHE')
    //   return res.send(JSON.parse(cachedBlogs))
    // }
    //
    // //if no, we need to respond to request and update our cache to
    // //store the data
    // const blogs = await Blog.find({_user: req.user.id}); // blogs is array of objects, we should json.stringify it
    // console.log('SERVING FROM MONGODB');
    // res.send(blogs);
    // client.set(req.user.id, JSON.stringify(blogs))
  });

  app.post('/api/blogs', requireLogin, cleanHash, async (req, res) => {
    const {title, content} = req.body;

    const blog = new Blog({
      title,
      content,
      _user: req.user.id
    });

    try {
      await blog.save();
      res.send(blog);
    } catch (err) {
      res.send(400, err);
    }

    console.log('CLEAR CACHE')
  });
};
