"use client"
import { useState, useEffect } from 'react';
import { Spinner, TextInput } from "flowbite-react";
import { HiOutlineSearch } from 'react-icons/hi';
import { Characters } from '../util/models';
import Link from "next/link";

export default function DFOSearch() {
  const [suggestions, setSuggestions] = useState<Characters>({ rows: [] });
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 400);

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

  //TODO: Display "No Results" if results are empty
  return (
    <div className="w-11/12 mx-auto">
      <div className="mb-5 text-2xl">Character Search</div>
      <div className="flex">
        <div className="flex-auto w-64">
          <TextInput
          autoComplete='new-password'
          icon={HiOutlineSearch}
          id="search"
          placeholder="Search by username"
          required
          type="search"
          onInput={handleInput}
          className="text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500"
          />
          {searchTerm && ( // only render suggestions if search bar is not empty
                  <ul className="mt-1 rounded-md divide-y divide-gray-200 bg-gray-100 text-gray-900">
                      {suggestions?.rows?.length !== undefined && suggestions.rows.length > 0 && (
                          suggestions.rows.map((suggestion, index) => (
                              <li key={index} className="px-2 py-2 cursor-pointer hover:bg-gray-200">
                                <Link href={`/character/${suggestion.characterId}`}>
                                  <span className="block font-medium text-gray-900">{suggestion.characterName}</span>
                                  <span className="block text-base text-gray-500">Class: {suggestion.jobGrowName}</span>
                                  {(suggestion.fame == undefined) ? (
                                    <span className="block text-sm text-gray-500">Level: {suggestion.level}</span>
                                  ) : (
                                    <span className="block text-sm text-gray-500">Level: {suggestion.level} | Fame: {suggestion.fame}</span>
                                  )}
                                  
                                  
                                  </Link>
                              </li>
                          ))
                      )}
                  </ul>
          )}
        </div>
        <div className="flex-none">
          {/* TODO: Figure out the css to get the spinner to go inside the search bar on both mobile and desktop. */}
          {isLoading ? <Spinner className="w-5 ml-3"/> : <div className="w-5 ml-3"/> }
        </div>
      </div>
    </div>
  );
}