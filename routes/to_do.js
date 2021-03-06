var router = require('express').Router();
var pg = require('pg');

var config = {
  database: 'to-do'
};
// var completed = false;
// initialize the database connection pool
var pool = new pg.Pool(config);

router.get('/', function(req, res){

  pool.connect(function(err, client, done) {
    if (err) {
      console.log('Error connecting to the DB', err);
      res.sendStatus(500);
      done();
      return;
    }

    client.query('SELECT * FROM list;', function(err, result){
      done();
      if (err) {
        console.log('Error querying the DB', err);
        res.sendStatus(500);
        return;
      }


      console.log('Got rows from the DB:', result.rows);
      res.send(result.rows);
    });
  });
});


router.get('/:id', function(req, res) {
  pool.connect(function(err, client, done) {
    if (err) {
      console.log('Error connecting to the DB', err);
      res.sendStatus(500);
      done();
      return;
    }
    client.query('SELECT * FROM list WHERE id = $1;', [req.params.id], function(err, result){
      done();
      if (err) {
        console.log('Error querying the DB', err);
        res.sendStatus(500);
        return;
      }

      console.log('Got rows from the DB:', result.rows);
      res.send(result.rows);
    });
  });
});


router.post('/', function(req, res){

  // var task = req.body.task;

  pool.connect(function(err, client, done){
    if (err) {
      console.log('Error connecting the DB', err);
      res.sendStatus(500);
      done();
      return;
    }

    client.query('INSERT INTO list (task) VALUES ($1) RETURNING *;',
    [req.body.newtask],
    function(err, result){
      done();
      if (err) {
        console.log('Error querying the DB', err);
        res.sendStatus(500);
        return;
      }
      console.log('Got rows from the DB:', result.rows);

      res.send(result.rows);
    });
  });
});

router.put('/:id', function(req, res){

    var id = req.params.id; //takes the value from /:id
    var task = req.body.task;
    var completed = req.body.completed;


    pool.connect(function(err, client, done){
        try{
        if(err){
            console.log('Error connecting to the DB', err);
            res.sendStatus(500);

            return;
        }
        // 'UPDATE list SET $2 WHERE id=$1', [id, true]
    client.query('UPDATE list SET completed = $2 WHERE id = $1 RETURNING *;',
        [id, TRUE], function(err, result){
            if(err){
            console.log('Error querying database',err);
            res.sendStatus(500);

      } else {
        res.send(result.rows);
}
});

} finally {
    done();
    }
  });
});




// DELETE TASK ITEM:

router.delete('/:id', function(req, res){
  var id = req.params.id;
  console.log(req.params.id);
  pool.connect(function(err, client, done){
    try {
      if (err) {
        console.log('Error connecting to DB', err);
        res.sendStatus(500);
        return;
      }

      client.query('DELETE FROM list WHERE id = $1;', [id], function(err){
        if (err) {
          console.log('Error querying the DB', err);
          res.sendStatus(500);
          return;
        }

        res.sendStatus(204);
      });
    } finally {
      done();
    }
  });
});


module.exports = router;
