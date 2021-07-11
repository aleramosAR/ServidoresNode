import express from "express";
import passport from "passport";
import { isAuth } from '../middlewares/Middlewares.js';
import {PORT} from '../utils.js';
import os from 'os';

const router = express.Router();
router.use(passport.initialize());
router.use(passport.session());

router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/index', failureRedirect: '/login' }));

router.get('/', function(req, res){
  res.redirect('/login');
});

router.get("/index", isAuth, (req, res) => {
  res.render("index", { user: req.session.passport.user });
});

router.get("/login", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("index");
  } else {
    res.render("login");
  }
});

router.get('/logout', (req, res) => {
  res.render("logout", { user: req.session.passport.user });
  req.logout();
})

router.get("/unauthorized", (req, res) => {
  res.render("unauthorized");
});

router.get("/login-error", (req, res) => {
  res.render("login-error");
});


router.get('/info', function(req, res){
  const used = process.memoryUsage();
  const memoria = [];
  const numCPUs = os.cpus().length;
  for (let key in used) {
    memoria.push(`${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
  }
  res.render("info", {
    process: process,
    path: process.cwd(),
    memoria: memoria,
    numCPUs: numCPUs
  });
});

let visitas = 0;
router.get('/visitas', function(req, res) {
  res.end(`Visitas: ${++visitas}`);
});

// Desactive este endpoint del entregable anterior para evitar que aparezcan más procesos de node activos.
/*router.get('/randoms', function(req, res) {
  const cant = req.query.cant ?? 100000000;
  const forked = fork('./generarNums.js', [cant]);

  setTimeout(() => {
    forked.send('calcular');  
  }, 1000);

  forked.on('message', result => {
    res.end(JSON.stringify(result, null, 3));
  })
});*/

router.get("/exit", (req, res) => {
  res.end("Salida del proceso de node.js");
  process.on('exit', (code) => {
    console.log(`Salida del proceso con el código: ${code}`);
  });
  process.exit();
});


router.get('/fork', (req, res) => {
  res.send(`Servidor express en ${PORT} - <b>PID ${process.pid}</b> - ${new Date().toLocaleString()}`)
})

router.get('/cluster', (req, res) => {
  res.send(`Servidor express en ${PORT} - <b>PID ${process.pid}</b> - ${new Date().toLocaleString()}`)
})

export default router;