import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

const useCategory = () => {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('전체');

  useEffect(() => {
    const category = searchParams.get('category');
    setSelectedCategory(category || '전체');
  }, [searchParams]);

  const handleCategorySelected = useCallback((categoryName: string) => {
    setSelectedCategory(categoryName);
  }, []);

  return { selectedCategory, handleCategorySelected };
};

export default useCategory;
