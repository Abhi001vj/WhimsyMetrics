import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { measurementCategories } from '@/lib/unitDatabase';

interface SearchInputProps {
  onSearch: (query: string) => void;
  loading: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, loading }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      toast({
        title: "Query is empty",
        description: "Please enter a measurement to convert.",
        variant: "destructive",
      });
      return;
    }
    onSearch(query);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  
  return (
    <section className="max-w-3xl mx-auto mb-14">
      <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
        <form onSubmit={handleSubmit}>
          <div className="relative">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1 relative">
                <i className="ri-search-line absolute left-4 top-1/2 transform -translate-y-1/2 text-primary text-xl"></i>
                <input 
                  type="text" 
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring focus:ring-primary/20 focus:outline-none font-medium text-lg transition-all bg-neutral-light"
                  placeholder="Try 'How heavy is a car in cats?' or '100 miles in bananas'"
                  aria-label="Enter your measurement query"
                  value={query}
                  onChange={handleInputChange}
                  ref={inputRef}
                  disabled={loading}
                />
              </div>
              <Button 
                type="submit"
                className="bg-secondary text-white font-display font-semibold text-lg px-8 py-4 rounded-xl hover:bg-secondary/90 transition-colors focus:outline-none focus:ring focus:ring-secondary/50 shadow-sm flex items-center justify-center"
                disabled={loading}
              >
                {loading ? 'Converting...' : 'Convert'} <i className="ri-magic-line ml-2"></i>
              </Button>
            </div>
          </div>
        </form>
        
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {measurementCategories.map(category => (
            <span key={category.id} className="measurement-tag">
              {category.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SearchInput;
