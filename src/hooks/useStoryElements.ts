import { useState, useCallback } from 'react';
import { StoryElement } from '../types/StoryElements';
import { initialStoryElements } from '../data/initialStoryElements';

export function useStoryElements() {
  const [elements, setElements] = useState(initialStoryElements);
  const [selectedElements, setSelectedElements] = useState({
    protagonist: '',
    setting: '',
    world: '',
  });

  const updateElement = useCallback((
    category: keyof typeof elements,
    elementId: string,
    newValue: string
  ) => {
    setElements(prev => ({
      ...prev,
      [category]: prev[category].map(element =>
        element.id === elementId ? { ...element, value: newValue } : element
      ),
    }));
  }, []);

  const addElement = useCallback((category: keyof typeof elements, value: string) => {
    const newId = `${category[0]}${Date.now()}`;
    setElements(prev => ({
      ...prev,
      [category]: [...prev[category], { id: newId, value }],
    }));
  }, []);

  const removeElement = useCallback((category: keyof typeof elements, elementId: string) => {
    setElements(prev => ({
      ...prev,
      [category]: prev[category].filter(element => element.id !== elementId),
    }));
  }, []);

  const updateSelection = useCallback((category: keyof typeof elements, value: string) => {
    setSelectedElements(prev => ({
      ...prev,
      [category]: value,
    }));
  }, []);

  return {
    elements,
    selectedElements,
    updateElement,
    addElement,
    removeElement,
    updateSelection,
  };
}