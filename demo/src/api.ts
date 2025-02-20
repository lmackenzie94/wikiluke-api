interface MongoDocument {
  _id: string; // MongoDB's automatic unique identifier
}

export interface Word extends MongoDocument {
  name: string;
  definition: string;
}

const BASE_URL = import.meta.env.VITE_API_URL;
const token = import.meta.env.VITE_API_TOKEN;

export const fetchWords = async (): Promise<Word[]> => {
  const response = await fetch(`${BASE_URL}/words`);
  if (!response.ok) {
    throw new Error('Failed to fetch words');
  }
  return response.json();
};

type AddWordRequest = Omit<Word, '_id'>;
export const addWord = async (word: AddWordRequest): Promise<Word> => {
  if (!token) {
    throw new Error('API token is not set');
  }
  const response = await fetch(`${BASE_URL}/words`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(word)
  });

  if (!response.ok) {
    throw new Error('Failed to add word');
  }
  return response.json();
};

export const deleteWord = async (wordId: string): Promise<void> => {
  if (!token) {
    throw new Error('API token is not set');
  }
  const response = await fetch(`${BASE_URL}/words/${wordId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  if (!response.ok) {
    throw new Error('Failed to delete word');
  }
};
