import React from 'react';
import { Copy } from 'lucide-react';
import { Dropdown } from './components/Dropdown';
import { useStoryElements } from './hooks/useStoryElements';

function App() {
  const {
    elements,
    selectedElements,
    updateElement,
    addElement,
    removeElement,
    updateSelection,
  } = useStoryElements();

  const handleCopyToClipboard = () => {
    const text = `主人公: ${selectedElements.protagonist}\n舞台: ${selectedElements.setting}\n世界: ${selectedElements.world}`;
    navigator.clipboard.writeText(text).then(() => {
      alert('クリップボードにコピーしました！');
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          ストーリー要素ジェネレーター
        </h1>

        <Dropdown
          label="主人公"
          elements={elements.protagonist}
          selectedValue={selectedElements.protagonist}
          onSelect={(value) => updateSelection('protagonist', value)}
          onEdit={(id, value) => updateElement('protagonist', id, value)}
          onAdd={(value) => addElement('protagonist', value)}
          onRemove={(id) => removeElement('protagonist', id)}
        />

        <Dropdown
          label="舞台"
          elements={elements.setting}
          selectedValue={selectedElements.setting}
          onSelect={(value) => updateSelection('setting', value)}
          onEdit={(id, value) => updateElement('setting', id, value)}
          onAdd={(value) => addElement('setting', value)}
          onRemove={(id) => removeElement('setting', id)}
        />

        <Dropdown
          label="世界"
          elements={elements.world}
          selectedValue={selectedElements.world}
          onSelect={(value) => updateSelection('world', value)}
          onEdit={(id, value) => updateElement('world', id, value)}
          onAdd={(value) => addElement('world', value)}
          onRemove={(id) => removeElement('world', id)}
        />

        <button
          onClick={handleCopyToClipboard}
          className="mt-6 w-full flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          <Copy size={20} />
          <span>組み合わせをコピー</span>
        </button>
      </div>
    </div>
  );
}

export default App;