import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import axios, {AxiosError} from 'axios';
import cn from 'classnames';

import {warnings} from '../../../constants';
import {REQUIRED_FIELDS} from './birdFormConstants/birdFormConstants';
import {CommonContext} from '../../../context/CommonContext';
import {checkErrors} from '../../../helpers/common';
import {birdsAPI} from '../../../api/birdsAPI';
import {dateTimeParsing, dateFormatting, formatTimeForDateTime} from '../../../helpers/formatDate';
import {Input} from '../../common/Input/Input';
import {Select} from '../../common/Select/Select';
import {DatePicker} from '../../common/DatePicker/DatePicker';
import {TimePicker} from '../../common/TimePicker/TimePicker';
import {IconStar} from '../../common/icons/IconStar/IconStar';

import {CommonError} from '../../../models/commonError';
import {Bird} from '../../../models/bird';
import {BirdDataForm} from './models/birdDataForm';
import {BirdFormProps} from './models/birdFormProps';
import {SmallScreenPages} from './models/smallScreenPages.enum';
import styles from './BirdForm.module.css';

export const BirdForm: React.FC<BirdFormProps> = ({isEdit, onSubmit, ...props}) => {
        const {changeIsLoading} = useContext(CommonContext);
        const navigate = useNavigate();
        const [commonErrors, setCommonErrors] = useState<CommonError | null>(null);
        const [options, setOptions] = useState<Array<Bird>>([]);
        const [page, setPage] = useState<number>(1);
        const {
            formState: {errors},
            register,
            handleSubmit,
            reset,
            setValue,
            getValues,
            trigger,
            watch,
        } = useForm<BirdDataForm>({
            mode: 'onChange',
        });

        //Список птиц из справочника для select
        useEffect(() => {
            changeIsLoading(true);
            birdsAPI.listBirds().then((result: Array<Bird>) => {
                if (result.length !== 0) {
                    setOptions(result);
                }
            }).catch((error) => {
                if (axios.isAxiosError(error)) {
                    const serverError = checkErrors(error as AxiosError<CommonError>);
                    setCommonErrors(serverError);
                }
            }).finally(() => changeIsLoading(false));
            return () => setOptions([]);
        }, [changeIsLoading]);

        //Для формы редактирования: для подтягивания дефолтных значений
        const resetForm = useCallback(() => {
            if (props.incubator && props.incubator.id !== getValues()?.id) {
                const {
                    bird,
                    breed,
                    count,
                    dateTime,
                    description,
                } = props.incubator;
                reset({
                    count,
                    breed,
                    description,
                    bird: bird.name,
                    date: dateFormatting(new Date(dateTime)),
                    time: formatTimeForDateTime(new Date(dateTime)),
                });
            }
        }, [props.incubator, reset, getValues]);

        useEffect(() => {
            if (isEdit) {
                resetForm();
            }
        }, [isEdit, resetForm]);

        const collectFormData = async (formData: BirdDataForm) => {
            const {date, time, count, bird, ...rest} = formData;
            const newCount = count ? Number(count) : null;
            const birdId = Number(options.find(({name}) => name === bird)?.id);
            const dateTime = date !== undefined && time !== undefined ? dateTimeParsing(date, time) : null;

            changeIsLoading(true);
            try {
                await onSubmit({...rest, dateTime, count: newCount, birdId});
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    const serverError = checkErrors(error as AxiosError<CommonError>);
                    setCommonErrors(serverError);
                }
            } finally {
                changeIsLoading(false);
            }
        }

        const turnOverThePage = async (page: number) => {
            //Проверяем заполнены ли поля и если заполнены, то переходим на следующую страницу
            const result = await trigger(REQUIRED_FIELDS);
            if (result) {
                setPage(page);
            }
        }

        return (
            <div>
                <h2 className={styles.heading}>Инкубация</h2>
                <form
                    onSubmit={handleSubmit(collectFormData)}
                    className={styles.formContainer}>
                    <div className={cn(styles.bird, {[styles.fieldVisible]: page === SmallScreenPages.First})}>
                        <Select
                            name="bird"
                            isRequired={true}
                            autoFocus={true}
                            placeholder="Птица"
                            options={options}
                            value={watch('bird')}
                            error={errors?.bird}
                            setValue={setValue}
                            register={register}
                        />
                        {errors?.bird && <div className={styles.errorText}>{errors.bird.message}</div>}
                    </div>
                    <div className={cn(styles.count, {[styles.fieldVisible]: page === SmallScreenPages.First})}>
                        <Input
                            name="count"
                            type="number"
                            isRequired={true}
                            autoFocus={false}
                            placeholder="Количество яиц"
                            maxValue={4}
                            value={watch('count')}
                            error={errors?.count}
                            setValue={setValue}
                            register={register}/>
                        {errors?.count && <div className={styles.errorText}>{errors.count.message}</div>}
                    </div>
                    <div className={cn(styles.date, {[styles.fieldVisible]: page === SmallScreenPages.First})}>
                        <DatePicker
                            name="date"
                            type="datePicker"
                            isRequired={true}
                            autoFocus={false}
                            placeholder="Дата закладки яиц"
                            error={errors?.date}
                            setValue={setValue}
                            register={register}/>
                        {errors?.date && <div className={styles.errorText}>{errors.date.message}</div>}
                    </div>
                    <div className={cn(styles.time, {[styles.fieldVisible]: page === SmallScreenPages.First})}>
                        <TimePicker
                            name="time"
                            type="timePicker"
                            isRequired={true}
                            autoFocus={false}
                            placeholder="Время"
                            error={errors?.date}
                            setValue={setValue}
                            register={register}/>
                        {errors?.time && <div className={styles.errorText}>{errors.time.message}</div>}
                    </div>
                    <div className={cn(styles.breed, {[styles.fieldVisible]: page === SmallScreenPages.Second})}>
                        <Input
                            name="breed"
                            type="text"
                            isRequired={false}
                            autoFocus={false}
                            placeholder="Порода"
                            maxValue={50}
                            register={register}/>
                    </div>
                    <div
                        className={cn(styles.descriptionContainer, {[styles.fieldVisible]: page === SmallScreenPages.Second})}>
                        <textarea
                            rows={3}
                            {...register('description')}
                            className={styles.description}
                            placeholder="Описание"
                        />
                    </div>
                    <div className={styles.requiredTextContainer}>
                        <IconStar/>
                        <span className={styles.requiredText}>{warnings.required}</span>
                    </div>
                    {commonErrors && <div className={styles.commonErrors}>{commonErrors.message}</div>}
                    <div className={styles.btnContainer}>
                        <button
                            type="button"
                            className={cn(styles.btnBack, {[styles.btnVisible]: page === SmallScreenPages.Second})}
                            onClick={() => turnOverThePage(SmallScreenPages.First)}>
                            Назад
                        </button>
                        <button
                            type="submit"
                            className={cn(styles.btnSave, {[styles.btnVisible]: page === SmallScreenPages.Second})}>
                            {isEdit ? 'Сохранить' : 'Добавить'}
                        </button>
                        <button
                            type="button"
                            className={cn(styles.btnCancel, {[styles.btnVisible]: page === SmallScreenPages.First})}
                            onClick={() => navigate('/')}>
                            Отмена
                        </button>
                        <button
                            type="button"
                            onClick={() => turnOverThePage(SmallScreenPages.Second)}
                            className={cn(styles.btnNext, {[styles.btnVisible]: page === SmallScreenPages.First})}
                        >
                            Далее
                        </button>
                    </div>
                </form>
            </div>
        )
    }
;
