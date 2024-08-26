const express = require('express');
const { register, login } = require('../controllers/authController');
const { createRole, getAllRoles } = require('../controllers/roleController');
const { createTask, getTasks, deleteTask, updateTask } = require('../controllers/taskController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');

const router = express.Router();

//============= Auth Routes ==============
/**
 * @openapi
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                  type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */
router.post('/register', register);
/**
 * @openapi
 * /login:
 *   post:
 *     summary: Log in a user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Unauthorized
 */
router.post('/login', login);


//=========== Role Routes =================
/**
 * @openapi
 * /roles:
 *   post:
 *     summary: Create a new role
 *     tags:
 *       - Role
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Role created successfully
 *       403:
 *         description: Forbidden
 */
router.post('/roles', authMiddleware, roleMiddleware(['admin']), createRole);
/**
 * @openapi
 * /roles:
 *   get:
 *     summary: Get all roles
 *     tags:
 *       - Role
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of roles
 *       403:
 *         description: Forbidden
 */
router.get('/roles', authMiddleware, roleMiddleware(['admin']), getAllRoles);


//============= Task Routes ================

/**
 * @openapi
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags:
 *       - Task
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *               priority:
 *                 type: string
 *     responses:
 *       201:
 *         description: Task created successfully
 *       403:
 *         description: Forbidden
 */
router.post('/tasks', authMiddleware, roleMiddleware(['admin', 'user']), createTask);

/**
 * @openapi
 * /tasks:
 *   get:
 *     summary: Get tasks
 *     tags:
 *       - Task
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *       - in: query
 *         name: assignedUserId
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of tasks
 *       403:
 *         description: Forbidden
 */
router.get('/tasks', authMiddleware, roleMiddleware(['admin', 'user']), getTasks);

/**
 * @openapi
 * /tasks:
 *   put:
 *     summary: Update the task
 *     tags:
 *       - Task
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                  type: string
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *               priority:
 *                 type: string
 *     responses:
 *       201:
 *         description: Task Updated successfully
 *       403:
 *         description: Forbidden
 */
router.put('/tasks', authMiddleware, roleMiddleware(['admin', 'user']), updateTask);

/**
 * @openapi
 * /tasks:
 *   delete:
 *     summary: Delete Task
 *     tags:
 *       - Task
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *     responses:
 *       201:
 *         description: Task Deleted successfully
 *       403:
 *         description: Forbidden
 */
router.delete('/tasks', authMiddleware, roleMiddleware(['admin', 'user']), deleteTask);



module.exports = router;
