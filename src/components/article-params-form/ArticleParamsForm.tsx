// src/components/article-params-form/ArticleParamsForm.tsx
import { useState, useEffect, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import {
  fontFamilyOptions,
  fontSizeOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
  defaultArticleState,
  ArticleStateType,
} from 'src/constants/articleProps';

import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

interface ArticleParamsFormProps {
  isOpen: boolean;
  initialState: ArticleStateType;
  onApply: (state: ArticleStateType) => void;
  onReset: (state: ArticleStateType) => void;
  onToggle: () => void;
  onClose: () => void;
}

export const ArticleParamsForm = ({
  isOpen,
  initialState,
  onApply,
  onReset,
  onToggle,
  onClose,
}: ArticleParamsFormProps) => {
  // Локальное состояние формы (то, что пользователь меняет)
  const [localState, setLocalState] = useState<ArticleStateType>(initialState);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Сбрасываем localState при открытии
  useEffect(() => {
    if (isOpen) {
      setLocalState(initialState);
    }
  }, [isOpen, initialState]);

  // Закрытие по клику вне
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  const handleChange = <K extends keyof ArticleStateType>(
    key: K,
    value: ArticleStateType[K]
  ) => {
    setLocalState(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApply(localState);
  };

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalState(defaultArticleState);
    onReset(defaultArticleState);
  };

  return (
    <>
      <ArrowButton isOpen={isOpen} onClick={onToggle} />
      <aside
        ref={sidebarRef}
        className={clsx(styles.container, {
          [styles.container_open]: isOpen,
        })}>
        <form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
          <Text as="h2" size={31} weight={800} uppercase>
            Задайте параметры
          </Text>

          <Select
            selected={localState.fontFamilyOption}
            options={fontFamilyOptions}
            title="Шрифт"
            onChange={(option) => handleChange('fontFamilyOption', option)}
          />

          <RadioGroup
            name="fontSize"
            options={fontSizeOptions}
            selected={localState.fontSizeOption}
            title="Размер шрифта"
            onChange={(option) => handleChange('fontSizeOption', option)}
          />

          <Select
            selected={localState.fontColor}
            options={fontColors}
            title="Цвет шрифта"
            onChange={(option) => handleChange('fontColor', option)}
          />

          <Separator />

          <Select
            selected={localState.backgroundColor}
            options={backgroundColors}
            title="Цвет фона"
            onChange={(option) => handleChange('backgroundColor', option)}
          />

          <Select
            selected={localState.contentWidth}
            options={contentWidthArr}
            title="Ширина контента"
            onChange={(option) => handleChange('contentWidth', option)}
          />

          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </>
  );
};