import express, { Request, Response } from 'express';

import {
  addCategory,
  updateCategory,
  getCategories,
  deleteCategory,
  getCategoryById,
} from '@handlers/categoryHandler';
import { CategoryData, CategoryDoc } from '@models/index';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  getCategories()
    .then((data: CategoryDoc[] | void) => {
      if (data && data.length <= 0) {
        res.status(200).send({
          message: 'no categories found',
        });
        return;
      }
      res.status(200).send({
        message: 'categories retrieved successfully',
        categories: data,
      });
    })
    .catch((err) => {
      res.status(400).send({ message: err });
    });
});
// 6837875fa58ad9c8b7790780, 6837876aa58ad9c8b7790782, 683a1e637c0302e519d1c858

router.get('/:id', async (req: Request, res: Response) => {
  let id = req.params['id'];
  let category = await getCategoryById(id);
  res.send(category);
});

router.post('/', async (req: Request, res: Response) => {
  let model = req.body;
  let result = await addCategory(model);
  res.send(result);
});

router.put('/:id', async (req: Request, res: Response) => {
  let data: CategoryDoc = req.body;
  let id = req.params['id'];
  let result = await updateCategory(id, data);
  res.send({ message: 'updated successfully', new: result });
});

router.delete('/:id', async (req: Request, res: Response) => {
  let id = req.params['id'];
  let message = await deleteCategory(id);
  res.send(message);
});

export default router;
