import { useQuery } from '@tanstack/react-query';
import './App.css';

// Types for our API responses
interface Word {
  _id: string;
  name: string;
  definition: string;
}

interface Advice {
  _id: string;
  text: string;
}

function App() {
  const { data: words, isLoading: wordsLoading } = useQuery({
    queryKey: ['words'],
    queryFn: async () => {
      const response = await fetch('http://localhost:1234/words');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json() as Promise<Word[]>;
    }
  });

  const { data: advice, isLoading: adviceLoading } = useQuery({
    queryKey: ['advice'],
    queryFn: async () => {
      const response = await fetch('http://localhost:1234/advice');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json() as Promise<Advice[]>;
    }
  });

  if (wordsLoading || adviceLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app">
      <h1>WikiLuke Dashboard</h1>

      <section>
        <h2>Words Collection</h2>
        <div className="words">
          {words?.map(word => (
            <div key={word._id} className="word">
              <h3>{word.name}</h3>
              <p>{word.definition}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Advice Collection</h2>
        <div className="advice">
          {advice?.map(item => (
            <div key={item._id} className="advice-item">
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
