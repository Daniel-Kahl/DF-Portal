"use client"
import { useState, useEffect } from 'react';
import { Spinner, TextInput } from "flowbite-react";
import { HiOutlineSearch } from 'react-icons/hi';
import { Characters } from '../../Util/service';
import { useRouter } from 'next/navigation';

export default function DFOSearch() {
    const { push } = useRouter();
  const [suggestions, setSuggestions] = useState<Characters>({ rows: [] });
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      setIsLoading(true); // set isLoading to true when fetching suggestions
      const response = await fetch(`/api/character?username=${debouncedSearchTerm}&requestType=full`);
      const data = await response.json();
      setSuggestions(data);
      setIsLoading(false); // set isLoading to false when suggestions are set
    };

    if (debouncedSearchTerm) {
      fetchSuggestions();
    }
  }, [debouncedSearchTerm]);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setSuggestions({ rows: [] }); // clear suggestions when input changes
  };

  const handleSearch = async (name: string) => {
    const response = await fetch(`/api/character?username=${name}&requestType=match`);
    const data = await response.json();
    setSuggestions(data);

    const input = document.getElementById("search") as HTMLInputElement;
    input.value = name;

    push(`/character/${data.rows[0].characterId}`);
  };

  return (
    <div className="w-11/12 mx-auto">
      <TextInput
        icon={HiOutlineSearch}
        id="search"
        placeholder="Search by username"
        required
        type="search"
        onInput={handleInput}
        className="text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500"
      />
      {/* TODO: Figure out the css to get the spinner to go inside the search bar on both mobile and desktop. */}
      {isLoading && <Spinner className="absolute inset-y-0 right-0 flex items-center pr-2" />} 
      {searchTerm && ( // only render suggestions if search bar is not empty
                <ul className="mt-1 rounded-md divide-y divide-gray-200 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                    {suggestions?.rows?.length !== undefined && suggestions.rows.length > 0 && (
                        suggestions.rows.map((suggestion, index) => (
                            <li key={index} className="px-2 py-2 cursor-pointer hover:bg-gray-100" onClick={() => handleSearch(suggestion.characterName)}>
                                <span className="block font-medium text-gray-900">{suggestion.characterName}</span>
                                <span className="block text-sm text-gray-500">Level: {suggestion.level}</span>
                            </li>
                        ))
                    )}
                </ul>
            )}
    </div>
  );
}