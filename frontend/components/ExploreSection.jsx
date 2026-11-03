'use client';

import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, Filter, X } from 'lucide-react';
import ProductCard from './ProductCard';

export default function ExploreSection({ onSelectProduct }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fallbackCategories = [
    "Medicines",
    "Vitamins & Supplements",
    "Cosmetics & Personal Care",
    "Medical Equipment",
    "Surgical Products",
    "Medical Consumables",
    "Wellness Essentials",
    "Orthopedic Supports"
  ];

  // Fetch categories
  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setCategories(data);
        } else {
          setCategories(fallbackCategories);
        }
      })
      .catch(() => setCategories(fallbackCategories));
  }, []);

  // Fetch products
  useEffect(() => {
    setIsLoading(true);
    let url = '/api/products';
    const params = new URLSearchParams();
    if (selectedCategory && selectedCategory !== 'All') {
      params.append('category', selectedCategory);
    }
    if (searchQuery.trim()) {
      params.append('search', searchQuery.trim());
    }
    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data);
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products', err);
        setIsLoading(false);
      });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 scroll-mt-20">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002b5c] tracking-tight">
          Online Pharmacy and Medical Supplies
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
          Whether you are looking for everyday wellness essentials, personal care products, medical supplies or healthcare equipment, Global Cure RX Pharmacy is here to make your shopping experience easier.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-slate-50/70 p-3 rounded-xl border border-slate-200/60">
        
        {/* Category Dropdown */}
        <div className="relative w-full sm:w-64">
          <label htmlFor="category-select" className="sr-only">Filter by Category</label>
          <div className="relative">
            <select
              id="category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full appearance-none bg-white border border-slate-200 text-slate-700 text-[14px] font-semibold py-2.5 pl-3.5 pr-10 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#004b93] focus:border-[#004b93] cursor-pointer"
            >
              <option value="All">Categories: All</option>
              {(categories.length > 0 ? categories : fallbackCategories).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <label htmlFor="search-input" className="sr-only">Search products</label>
          <input
            id="search-input"
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 text-slate-800 text-xs py-2.5 pl-9 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#004b93] focus:border-[#004b93] placeholder-slate-400"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Category Pills (Quick Filter on Desktop & Mobile) */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-6 scrollbar-none text-[14px]">
        <button
          onClick={() => setSelectedCategory('All')}
          className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap text-[14px] transition-colors ${
            selectedCategory === 'All'
              ? 'bg-[#002b5c] text-white shadow-sm'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          All
        </button>
        {(categories.length > 0 ? categories : fallbackCategories).map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap text-[14px] transition-colors ${
              selectedCategory === cat
                ? 'bg-[#002b5c] text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 py-12">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-slate-50 rounded-xl p-4 animate-pulse h-72 border border-slate-100 flex flex-col justify-between">
              <div className="bg-slate-200 rounded-lg h-36 w-full"></div>
              <div className="space-y-2 mt-4">
                <div className="bg-slate-200 h-4 rounded w-3/4"></div>
                <div className="bg-slate-200 h-4 rounded w-1/2"></div>
              </div>
              <div className="bg-slate-200 h-9 rounded-full mt-4"></div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <p className="text-base font-semibold text-slate-600">No products found</p>
          <p className="text-xs text-slate-400 mt-1">Try another category or search keyword</p>
          <button
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
            className="mt-4 px-4 py-2 bg-[#004b93] text-white text-xs font-semibold rounded-full hover:bg-[#003a73]"
          >
            View All Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => onSelectProduct(product)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
