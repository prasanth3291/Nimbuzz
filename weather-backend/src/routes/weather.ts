import { Router } from 'express';
import { addOrUpdateWeather, incrementTagCount, getTagCounts } from '../controllers/weatherController';

const router: Router = Router();

router.post('/add_or_update_city', addOrUpdateWeather);
router.post('/update_tag_count', incrementTagCount);
router.get('/get_tag_counts', getTagCounts);

export default router;
