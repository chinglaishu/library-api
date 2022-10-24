import { SetMetadata } from '@nestjs/common';
import { ROLE, ROLE_METADATA_KEY } from '../constants/constants';

export const Roles = (...roles: ROLE[]) => SetMetadata(ROLE_METADATA_KEY, roles);
