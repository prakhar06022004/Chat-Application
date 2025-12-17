import { sendMessage } from "../controllers/messageController.js";
import { isAuth } from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js";

const messageRouter = express.Router();
messageRouter.get("/send/:receiver", isAuth, upload.single("image"), sendMessage);
export default messageRouter;
