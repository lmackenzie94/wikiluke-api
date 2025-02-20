import './index.css';
import { useWords } from './useWords';

function App() {
  const {
    words,
    isLoading,
    error,
    isFetching,
    status,
    dataUpdatedAt,
    addWordMutation,
    deleteWordMutation,
    isDeletingWord
  } = useWords();

  // Add word handler
  const handleAddWord = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const word = formData.get('word') as string;
    const definition = formData.get('definition') as string;
    console.log(word, definition);
    addWordMutation.mutate({ name: word, definition });

    // Reset form
    (e.target as HTMLFormElement).reset();
  };

  // Delete word handler
  const handleDeleteWord = (id: string) => {
    deleteWordMutation.mutate(id);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-gray-950 text-white text-center p-4">
        <h1 className="text-2xl font-bold">WikiLuke Dashboard</h1>
      </header>
      {addWordMutation.isSuccess && (
        <p className="text-center bg-green-500 text-white p-2 rounded-md">
          Word added successfully!
        </p>
      )}
      {isFetching && (
        <p className="text-center bg-blue-500 text-white p-2 rounded-md">
          Refreshing (fetching) words...
        </p>
      )}
      <main className="container max-w-screen-lg mx-auto mt-10">
        <h2 className="text-2xl font-bold">Words Collection</h2>
        {isLoading && <p>Loading words...</p>}
        {error && <p className="text-red-500">Error: {error?.message}</p>}
        {status && <p className="text-gray-500">Fetch status: {status}</p>}
        {!!dataUpdatedAt && (
          <p className="text-gray-500">
            Last updated at: {new Date(dataUpdatedAt).toLocaleString()}
          </p>
        )}

        {words?.length > 0 && (
          <div className="mt-5 space-y-4">
            {words?.map(word => (
              <article
                key={word._id}
                className={`border border-gray-200 p-4 rounded-md flex justify-between items-center bg-white shadow-sm transition-opacity duration-300 ${
                  isDeletingWord(word._id) ? 'opacity-50' : ''
                }`}
              >
                <div>
                  <h3 className="text-lg font-bold">{word.name}</h3>
                  <p className="text-gray-500">{word.definition}</p>
                </div>
                {deleteWordMutation.error ? (
                  <p className="text-red-500">
                    Error: {deleteWordMutation.error?.message}
                  </p>
                ) : (
                  <button
                    onClick={() => handleDeleteWord(word._id)}
                    disabled={isDeletingWord(word._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                  >
                    {isDeletingWord(word._id) ? 'Deleting...' : 'Delete'}
                  </button>
                )}
              </article>
            ))}
          </div>
        )}

        <form
          onSubmit={handleAddWord}
          className="mt-10 max-w-md mx-auto bg-blue-50 p-4 rounded-md border border-gray-200 shadow-md"
        >
          <label
            htmlFor="word"
            className="block text-xs uppercase font-bold text-gray-700"
          >
            Word
          </label>
          <input
            type="text"
            id="word"
            name="word"
            disabled={addWordMutation.isPending}
            className="mt-1 block bg-white w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-400 focus:ring-opacity-50 sm:text-sm p-2"
          />
          <label
            htmlFor="definition"
            className="block text-xs uppercase font-bold text-gray-700 mt-4"
          >
            Definition
          </label>
          <input
            type="text"
            id="definition"
            name="definition"
            disabled={addWordMutation.isPending}
            className="mt-1 block bg-white w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-400 focus:ring-opacity-50 sm:text-sm p-2"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
            disabled={addWordMutation.isPending}
          >
            {addWordMutation.isPending ? 'Adding...' : 'Add Word'}
          </button>
        </form>

        {addWordMutation.error && (
          <p className="text-red-500">
            Error: {addWordMutation.error?.message}
          </p>
        )}
      </main>
    </div>
  );
}

export default App;
