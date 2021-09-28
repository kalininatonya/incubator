import React from 'react';
import { Sizes } from '../../../../models/sizes.enum';

export interface LoaderProps {
  isLoading: boolean;
  overlay: boolean;
  size: Sizes;
  children: React.ReactNode;
}
