'use client';

import Category from '@/components/Category/Category';
import Nav from '@/components/Nav/Nav';
import SearchBar from '@/components/SearchBar/SearchBar';
import Weather from '@/components/Weather/Weather';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center w-full">
      <SearchBar />
      <Category
        selectedCategory={''}
        onCategorySelected={function (selectedCategoryName: string): void {
          throw new Error('Function not implemented.');
        }}
      />
      <Weather />
      {children}
      <Nav />
    </div>
  );
}