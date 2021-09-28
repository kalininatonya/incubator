import React, {MouseEvent, useRef, useState} from 'react';
import cn from 'classnames';

import {useOutsideClick} from '../../../hooks/outsideClick.hook';
import {required} from '../../../helpers/validators/validators';

import {Popup} from '../Popup/Popup';
import {IconDown} from '../icons/IconDown/IconDown';
import {IconStar} from '../icons/IconStar/IconStar';

import {SelectProps} from './models/selectProps';
import styles from './Select.module.css';

export const Select: React.FC<SelectProps> = ({
                                                  options,
                                                  placeholder,
                                                  value, error,
                                                  isRequired,
                                                  name,
                                                  autoFocus,
                                                  setValue,
                                                  register
                                              }) => {
        const labelRef = useRef<HTMLLabelElement | null>(null);
        const [isOpen, setIsOpen] = useState<boolean>(false);
        const [optionId, setOptionId] = useState<number>(1);

        useOutsideClick(labelRef, () => {
            setIsOpen(false);
        });

        const openAndCloseOptions = (event: MouseEvent<HTMLElement>) => {
            const {id} = (event.target as HTMLElement);
            //Чтобы options открывались/закрывались по клику
            if (id === 'iconDown' || id === 'option') {
                return;
            }

            setIsOpen(!isOpen);
        }

        const changeIsOpenWithKeyboard = (event: React.KeyboardEvent<HTMLLabelElement>) => {
            const {code} = event;
            let newOptionId = optionId; //id первого элемента у меня всегда начинается с 1

            if (code === 'ArrowDown') {
                newOptionId = newOptionId >= options.length ? 1 : newOptionId + 1;
            } else if (code === 'ArrowUp') {
                newOptionId = newOptionId <= 1 ? options.length : newOptionId - 1;
            }

            if (code === 'Space' || code === 'Enter') {
                event.preventDefault(); //Чтобы форма не отправлялась
                if (isOpen) {
                    const element = options.filter((el) => el.id === optionId)[0];
                    if (setValue) {
                        setValue(name, element.name, {
                            shouldValidate: true
                        });
                    }
                }
                setIsOpen(!isOpen);
            }
            if (code === 'Escape') {
                setIsOpen(false);
            }
            setOptionId(newOptionId);
        }

        const changeOption = (event: MouseEvent<HTMLElement>) => {
            const {innerHTML} = (event.target as HTMLElement);
            if (setValue) {
                setValue(name, innerHTML, {
                    shouldValidate: true
                });
            }
        }

        const renderOptions = () => {
            return (
                <div id='option' className={styles.optionsContainer}
                     onMouseDown={(e) => e.preventDefault()}
                     onClick={(e) => changeOption(e)}>
                    {
                        options.map((option) => <div
                            id='option' key={option.id}
                            className={cn(styles.option,
                                {
                                    [styles.selectedOption]: option.name === value,
                                    [styles.hoverOption]: option.id === optionId
                                })}>{option.name}
                        </div>)
                    }
                </div>
            )
        }

        return (
            <label
                className={styles.selectContainer} ref={labelRef}
                onClick={(e) => openAndCloseOptions(e)}
                onKeyDown={(e) => changeIsOpenWithKeyboard(e)}
            >
                {
                    isRequired && <div onMouseDown={(e) => e.preventDefault()}
                                       className={styles.iconStarContainer}>
                        <IconStar/>
                    </div>
                }
                <input className={cn(styles.input, {[styles.errorInput]: error?.message})}
                       autoFocus={autoFocus}
                       type='text'
                       placeholder={placeholder}
                       readOnly={true}
                       {...register(name, {
                           validate: {
                               required: (v: string) => isRequired && required(v)
                           }
                       })}
                />
                <div id='iconDown' onMouseDown={(e) => e.preventDefault()}
                     className={cn(styles.iconDownContainer, {[styles.isOpen]: isOpen})}>
                    <IconDown/>
                </div>
                {
                    isOpen ? <Popup isOpen={isOpen}>
                        {renderOptions()}
                    </Popup> : null
                }
            </label>
        )
    }
;