import express, { Request, Response } from 'express';
import { getAllBrands, getBrandById } from '@controllers';

const router = express.Router();

router.route('/').get(async (req: Request, res: Response): Promise<void> => {
  const data = await getAllBrands();
  if (!data) {
    res.status(404).send({ message: 'No data available' });
  }
  res.status(200).send({ message: 'success', data });
});

router
  .route('/:id')
  .get(async (req: Request, res: Response): Promise<void> => {
    let id = req.params['id'];
    const brand = await getBrandById(id);
    if (!brand) {
      res.status(404).send({ message: 'no brand found' });
      return;
    }
    res.status(200).send({ message: 'success', brand });
  })
  .put();

export default router;
