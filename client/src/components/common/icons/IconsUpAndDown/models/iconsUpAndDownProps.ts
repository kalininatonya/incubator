import {MouseEvent} from 'react';

export interface IconsUpAndDownProps {
    id: string;
    getId?(e: MouseEvent<HTMLOrSVGElement>): void;
}