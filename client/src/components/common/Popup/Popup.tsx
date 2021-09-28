import * as React from 'react';
import {useCallback, useEffect, useRef, useState} from 'react';
import cn from 'classnames';

import {PopupProps} from './models/popupProps';
import styles from './Popup.module.css';

export const Popup: React.FC<PopupProps> = ({children}) => {
    const [position, setPosition] = useState<string>('bottom');
    const divRef = useRef<HTMLDivElement | null>(null);
    const [maxContainerSize, setMaxContainerSize] = useState<number | null>(null);
    //Координаты видимой части экрана без скролла
    const [coordinatesVisibleDisplay, setCoordinatesVisibleDisplay] = useState<number | null>(null);

    useEffect(() => {
        //window.innerHeight - внутренний размер окна.
        // Внутренний размер окна - это ширина и высота области просмотра (вьюпорта). Высота видимой части экрана.
        const popupCoordinates = divRef.current?.getBoundingClientRect(); //Координаты контейнера
        //Общий максимальный размер контейнера
        const commonMaxHeight = popupCoordinates && (popupCoordinates.top + popupCoordinates.height);
        commonMaxHeight && setMaxContainerSize(commonMaxHeight);
        //Внутренний размер окна без полос прокрутки(Координаты видимой части экрана без скролла).
        setCoordinatesVisibleDisplay(document.documentElement.clientHeight);
    }, []);

    const memoizedCheckPosition = useCallback(() => {
            if(maxContainerSize && coordinatesVisibleDisplay && maxContainerSize >= coordinatesVisibleDisplay) {
                //Слишком низко элемент;
                //Открывается вверх
                if (position !== 'top') {
                    setPosition('top');
                }
            } else {
                //Слишком высоко элемент или нормально;
                //Открывается вниз
                if (position !== 'bottom') {
                    setPosition('bottom');
                }
            }
        },
        [position, maxContainerSize, coordinatesVisibleDisplay]
    );

    useEffect(() => {
        memoizedCheckPosition();
    }, [memoizedCheckPosition]);

    return (
        <div ref={divRef}
             className={cn(styles.container, {
                 [styles.bottom]: position === 'bottom',
                 [styles.top]: position === 'top'
             })}>
            {children}
        </div>
    )
}