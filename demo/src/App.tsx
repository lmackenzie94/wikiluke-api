import { useQuery } from '@tanstack/react-query';
import './App.css';
import { fetchAdvice, fetchWords } from './api';

function App() {
  const {
    data: words = [],
    isLoading: wordsLoading,
    isError: wordsHasError,
    error: wordsError,
    isFetching: wordsFetching,
    status: wordsStatus,
    dataUpdatedAt: wordsDataUpdatedAt
  } = useQuery({
    queryKey: ['words'],
    queryFn: fetchWords
  });

  const {
    data: advice = [],
    isLoading: adviceLoading,
    isError: adviceHasError,
    error: adviceError,
    isFetching: adviceFetching,
    status: adviceStatus,
    dataUpdatedAt: adviceDataUpdatedAt
  } = useQuery({
    queryKey: ['advice'],
    queryFn: fetchAdvice
  });

  return (
    <div className="app">
      <h1>WikiLuke Dashboard</h1>

      <section>
        <h2>Words Collection</h2>
        {wordsLoading && <div>Loading words...</div>}
        {wordsFetching && <div>Fetching words...</div>}
        {wordsHasError && <div>Error: {wordsError?.message}</div>}
        {wordsStatus && <p>Status: {wordsStatus}</p>}
        {!!wordsDataUpdatedAt && (
          <p>
            Last updated at: {new Date(wordsDataUpdatedAt).toLocaleString()}
          </p>
        )}

        {words?.length > 0 && (
          <div className="words">
            {words?.map(word => (
              <div key={word._id} className="word">
                <h3>{word.name}</h3>
                <p>{word.definition}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2>Advice Collection</h2>
        {adviceLoading && <div>Loading advice...</div>}
        {adviceFetching && <div>Fetching advice...</div>}
        {adviceHasError && <div>Error: {adviceError?.message}</div>}
        {adviceStatus && <p>Status: {adviceStatus}</p>}
        {!!adviceDataUpdatedAt && (
          <p>
            Last updated at: {new Date(adviceDataUpdatedAt).toLocaleString()}
          </p>
        )}

        {advice?.length > 0 && (
          <div className="advice">
            {advice?.map(item => (
              <div key={item._id} className="advice-item">
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
