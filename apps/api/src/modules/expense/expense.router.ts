import {
  Router,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import {
  createExpenseController,
  deleteExpenseController,
  fetchCategoriesController,
  fetchExpensesController,
  updateExpenseController,
} from "./expense.controller";
import { authMiddleware } from "../../middleware/authMiddleware";

const router = Router();

router.get(
  "/",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) =>
    fetchExpensesController(req, res).catch(next),
);

router.post(
  "/",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) =>
    createExpenseController(req, res).catch(next),
);

router.patch(
  "/:id",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) => {
    updateExpenseController(req, res).catch(next);
  },
);

router.delete(
  "/:id",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) => {
    deleteExpenseController(req, res).catch(next);
  },
);

router.get("/category", (req: Request, res: Response, next: NextFunction) => {
  fetchCategoriesController(req, res).catch(next);
});

export default router;
