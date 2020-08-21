const routes = require("express").Router();
const authMiddleware = require("./app/middleware/auth");

const SessionController = require("./app/controllers/SessionController");
const UsersController = require("./app/controllers/UsersController");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const swaggerSpec = swaggerJSDoc({
  swaggerDefinition: {
    info: {
      title: "Desafio REST Api Document",
      version: "1.0.0",
      description: ``
    },
    basePath: "/"
  },
  apis: ["./src/routes.js"]
});

/**
 * @swagger
 * /sessions:
 *  post:
 *    tags: [Sessions]
 *    description: realizar login
 *    produces:
 *      - application/json
 *    parameters:
 *    - in: body
 *      name: body
 *      required: true
 *      description: Enviar email e password
 *
 *    responses:
 *      200:
 *        description: retorno do token para login
 */
routes.post("/sessions", SessionController.store);

/**
 * @swagger
 * /users:
 *  post:
 *    tags: [Users]
 *    description: realizar cadastro de um novo usuário
 *    produces:
 *      - application/json
 *    parameters:
 *    - in: body
 *      name: body
 *      required: true
 *      description: Enviar name, email e password
 *
 *    responses:
 *      200:
 *        description: retorno do usuario cadastrado
 */
routes.post("/users", UsersController.create);

routes.use("/api-docs", swaggerUi.serve);
routes.get("/api-docs", swaggerUi.setup(swaggerSpec));

routes.use(authMiddleware);
/**
 * @swagger
 * /users:
 *  get:
 *    tags: [Users]
 *    description: pegar os dados do usuário
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: header
 *        name: Authorization
 *        schema:
 *            type: string
 *        required: true
 *        description: Colocar o Bearer na frente do token gerado no login
 *
 *    responses:
 *      200:
 *        description: retorno do usuario
 */
routes.get("/users", UsersController.index);
module.exports = routes;
