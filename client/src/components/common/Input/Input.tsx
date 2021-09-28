import * as React from 'react';
import {MouseEvent, useState} from 'react';
import cn from 'classnames';

import {noop} from '../../../helpers/noop';
import {checkValue, maxLengthCreator, minLengthCreator, required} from '../../../helpers/validators/validators';

import {IconStar} from '../icons/IconStar/IconStar';
import {IconUp} from '../icons/IconsUpAndDown/IconUp';
import {IconDown} from '../icons/IconsUpAndDown/IconDown';
import {IconClosedEye} from '../icons/IconClosedEye/IconClosedEye';
import {IconEye} from '../icons/IconEye/IconEye';

import {FormFieldsProps} from '../../../models/forms/formFieldsProps';
import styles from './Input.module.css';

export const Input: React.FC<FormFieldsProps> = ({
                                                         name,
                                                         type,
                                                         autoFocus,
                                                         placeholder,
                                                         isRequired,
                                                         maxValue,
                                                         minValue,
                                                         value,
                                                         error,
                                                         setValue,
                                                         register,
                                                     }) => {
    const [inputType, setInputType] = useState<string>('password');

    const changeNumber = (e: MouseEvent<HTMLElement>) => {
        const {id} = (e.target as HTMLDivElement);
        let numberValue = Number(value);
        if (id === 'up') {
            numberValue++;
        }
        if (id === 'down') {
            numberValue--;
        }

        if (type === 'number' && setValue) {
            setValue(name, numberValue, {
                shouldValidate: true
            });
        }
    }

    const showPassword = () => {
        setInputType(inputType === 'text' ? 'password' : 'text');
    }

    return (
        <label className={styles.inputContainer}>
            {
                isRequired && <div onMouseDown={(e) => e.preventDefault()} className={styles.iconStarContainer}>
                    <IconStar/>
                </div>
            }
            <input className={cn(styles.input, {[styles.errorInput]: error?.message})}
                   autoFocus={autoFocus}
                   id={name}
                   type={type === 'password' ? inputType : type}
                   placeholder={placeholder}
                   {...register(name, {
                       validate: {
                           required: (v: string) => isRequired ? required(v) : undefined,
                           maxLength: maxValue ? maxLengthCreator(maxValue) : noop,
                           minLength: minValue ? minLengthCreator(minValue) : noop,
                           checkValue: (v: string) => type === 'number' ? checkValue(v) : undefined,
                       }
                   })
                   }
            />
            {
                type === 'number' &&
                <div className={styles.iconsContainer}
                     onMouseDown={(e) => e.preventDefault()}
                     onClick={(e) => changeNumber(e)}>
                    <div id='up' className={styles.iconUp}>
                        <IconUp id={'up'} getId={changeNumber}/>
                    </div>
                    <div id='down' className={styles.iconDown}>
                        <IconDown id={'down'} getId={changeNumber}/>
                    </div>
                </div>
            }
            {
                type === 'password' &&
                <div className={styles.iconEyeContainer}
                     onMouseDown={(e) => e.preventDefault()}
                     onClick={showPassword}>
                    {inputType === 'text' ? <IconEye/> : <IconClosedEye/>}
                </div>
            }
        </label>
    )
};
