import express from 'express';
import mysql from 'mysql';

const app = express();
const port = 3000;

const config = {
  host: 'db',
  user: 'root',
  password: 'mysql',
  database: 'nodedb',
};

const connection = mysql.createConnection(config);
let sql;

function insertNames() {
  sql = `INSERT INTO people(name) values('Juliano');`;
  connection.query(sql);
  sql = `INSERT INTO people(name) values('Bob');`;
  connection.query(sql);
  sql = `INSERT INTO people(name) values('Camila');`;
  connection.query(sql);
}

function deleteAllNames() {
  sql = `DELETE FROM people`;
  connection.query(sql);
}

app.get('/', (request, response) => {
  insertNames();
  connection.query(
    'Select name from people;',
    function (error, results, fields) {
      let text =
        '<h1>Full Cycle Rocks!</h1><p>- Lista de nomes cadastrada no banco de dados.</p><br><ul>';
      for (const user of results) {
        text += `<li>${user.name}</li>`;
      }
      text += '</ul>';
      deleteAllNames();
      return response.send(text);
    }
  );

  // connection.end();
});

app.listen(port, () => console.log('server is running on port 3000'));
