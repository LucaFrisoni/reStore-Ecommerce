const express = require("express");

const router = express.Router();

const userController = require("../Controllers/controllersUser");

const {  postVerifyUser,  getVerifyUser,} = require("../Controllers/verification");

const upload = require("../utils/multer");

const { getUbi, addUbi,deleteUbi,modifyUbi } = require("../Controllers/UbicacionControllers");

const banUser = require("../Controllers/banUser")

const getUsersOrders = require("../Controllers/envios")


// Ruta POST para crear un nuevo usuario
router.post("/", userController.createUserController);

router.put("/changePassword", userController.updatePasswordController);

router.put("/:id", upload.single("profileImage"), userController.updateUser);
// Ruta POST para subir la foto de perfil del usuario

// Ruta PUT para actualizar la foto de perfil del usuario

router.get("/", userController.getUsersHandler);
//Ojoooooooooooooooooooooooooo con esta ruta, si se crea otra ruta que sea de solo un slash / siempre va a entrar aqui y no a la ruta correcta
router.get("/:id", userController.getUsersHandler);

router.get("/:email/email", userController.getEMAIL);
//--------------Verificaciones----------------------------------------------------------------//
router.post("/verify_email", postVerifyUser);

router.get("/verify_emaill/:uuid", getVerifyUser);
//-----------UbicacionObj-------------------------------------------------------------------------------------------------------------//
router.get("/ubication/:id", getUbi);

router.put("/ubication/add", addUbi);

router.put("/ubication/delete", deleteUbi);

router.put("/ubication/modify", modifyUbi);
//-----------BannedUser-------------------------------------------------------------------------------------------------------------//
router.put("/ban/user",banUser)
//-----------EnviosUser-------------------------------------------------------------------------------------------------------------//
router.get("/envios/all",getUsersOrders)






module.exports = router;
