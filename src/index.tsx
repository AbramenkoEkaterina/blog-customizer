import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';
//компонеты статьи
import { Article } from './components/article/Article';
//боковая панель с настройками
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
//формальное описание структуры и обьект с начальными значениями
import { defaultArticleState, ArticleStateType } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

export const App = () => {
	//текущее состояние страницы, не начальное
  const [articleState, setArticleState] = useState<ArticleStateType>(defaultArticleState);
  //открытие/закрытие панели по умолчанию закрыта
  const [sidebarOpen, setSidebarOpen] = useState(false);

  //переключение сайдбара
  const toggleSidebar = () => setSidebarOpen(prev => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  //применение изменений когда пользователь нажимает применить
  const handleApply = (newState: ArticleStateType) => {
    setArticleState(newState);//обновила состояние статьи
    closeSidebar();//за это надо спросить нужент этот пункт или нет      ??????????
  };

  //сбросить все настройки
  const handleReset = (resetState: ArticleStateType) => {
    setArticleState(resetState);
  };

  return (
    <main
      className={clsx(styles.main)}
      style={
        {
          '--font-family': articleState.fontFamilyOption.value,
          '--font-size': articleState.fontSizeOption.value,
          '--font-color': articleState.fontColor.value,
          '--container-width': articleState.contentWidth.value,
          '--bg-color': articleState.backgroundColor.value,
        } as CSSProperties
      }>
      
      <ArticleParamsForm
        isOpen={sidebarOpen} //открыт/закрыт
        initialState={articleState} //при открытие текущее состояние
        onApply={handleApply}//те настроки которые выбраны до кнопки применить
        onReset={handleReset}
        onToggle={toggleSidebar}
        onClose={closeSidebar}
      />
      
      <Article />
    </main>
  );
};

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
