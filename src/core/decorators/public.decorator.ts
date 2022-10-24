import { SetMetadata } from '@nestjs/common';
import { PUBLIC_API_METADATA_KEY } from '../constants/constants';

export const Public = () => SetMetadata(PUBLIC_API_METADATA_KEY, true);
