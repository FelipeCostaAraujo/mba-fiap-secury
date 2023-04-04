const express = require('express');
const db = require("./db");
const { randomUUID } = require('crypto');
const utils = require("./utils");
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Express em execução e aguardando requisições em http://localhost:${port}`)
});

app.get('/', (req, res) => {
  res.send('Hello World!')
});

      app.use(bodyParser.json());

      app.post('/clients', (req, res, next) => {

        //TODO: Implementar inclusao do cliente no banco de dados
        var result = req.body;
        console.log(`Usuário %o cadastrado com sucesso`, result)
        res.send(result);
      });

      app.get('/clients/:cpf', (req, res, next) => {

        //TODO: Implementar consulta de cliente por cpf no banco de dados
        var result = {  nome: "Gabriel Pereira da Silva", 
                        email: "gabrielgps25@teste.com",
                        cpf: 23430988332,
                        orientacao_sexual: "hetero",
                        permite_publicidade: true };
        var errResult = { status: 404, message: "Usuário não encontrado"};

        if(req.params['cpf'] === "23430988332"){
          console.log(`Usuário %o encontrado com sucesso`, result)
          return res.send(result);
        }

        console.error(`Usuário de CPF: ${req.params['cpf']} não encontrado`)
        return res.status(errResult.status).send(errResult);
        });


        app.post('/clients', async (req, res, next) => {
            try {
              var client = req.body;
              client.idPessoa = randomUUID();
              await db.insertClient(client);
              utils.logInfo("Novo usuário cadastrado com sucesso", client)
              //console.log(`Usuário %o cadastrado com sucesso`, client)
              return res.send(client);
            } catch (err) {
              next(err);
            }
      
            console.log(`Usuário %o cadastrado com sucesso`, result)
            res.send(result);
          });
      
          app.get('/clients/:cpf', async (req, res, next) => {
      
            try {
              var client = await db.selectClientByCpf(req.params['cpf']);
              console.log(`Usuário %o encontrado com sucesso`, client)
              return res.send(client);
            } catch (err) {
              next(err);
            }
          });
      
          /* Error handler middleware */
          app.use((err, req, res, next) => {
            const statusCode = err.statusCode || 500;
            console.error(err.message, err.errMessage);
            res.status(statusCode).json({ message: err.message });
          });

         

          