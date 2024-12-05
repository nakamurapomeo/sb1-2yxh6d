import React from 'react';
import { StoryElement } from '../types/StoryElements';
import { Pencil, Trash, Plus } from 'lucide-react';

interface DropdownProps {
  label: string;
  elements: StoryElement[];
  selectedValue: string;
  onSelect: (value: string) => void;
  onEdit: (id: string, value: string) => void;
  onAdd: (value: string) => void;
  onRemove: (id: string) => void;
}

export function Dropdown({
  label,
  elements,
  selectedValue,
  onSelect,
  onEdit,
  onAdd,
  onRemove,
}: DropdownProps) {
  const [isEditing, setIsEditing] = React.useState<string | null>(null);
  const [newElementValue, setNewElementValue] = React.useState('');

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <select
          value={selectedValue}
          onChange={(e) => onSelect(e.target.value)}
          className="w-full p-2 border rounded-md bg-white shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        >
          <option value="">選択してください</option>
          {elements.map((element) => (
            <option key={element.id} value={element.value}>
              {element.value}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-2 space-y-2">
        {elements.map((element) => (
          <div key={element.id} className="flex items-center space-x-2">
            {isEditing === element.id ? (
              <input
                type="text"
                value={element.value}
                onChange={(e) => onEdit(element.id, e.target.value)}
                onBlur={() => setIsEditing(null)}
                className="flex-1 p-1 border rounded"
                autoFocus
              />
            ) : (
              <span className="flex-1">{element.value}</span>
            )}
            <button
              onClick={() => setIsEditing(element.id)}
              className="p-1 text-gray-600 hover:text-gray-900"
            >
              <Pencil size={16} />
            </button>
            <button
              onClick={() => onRemove(element.id)}
              className="p-1 text-red-600 hover:text-red-900"
            >
              <Trash size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-2 flex space-x-2">
        <input
          type="text"
          value={newElementValue}
          onChange={(e) => setNewElementValue(e.target.value)}
          placeholder="新しい項目を追加"
          className="flex-1 p-2 border rounded-md"
        />
        <button
          onClick={() => {
            if (newElementValue.trim()) {
              onAdd(newElementValue.trim());
              setNewElementValue('');
            }
          }}
          className="p-2 text-indigo-600 hover:text-indigo-900"
        >
          <Plus size={20} />
        </button>
      </div>
    </div>
  );
}