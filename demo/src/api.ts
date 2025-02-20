interface Word {
  _id: string;
  name: string;
  definition: string;
}

interface Advice {
  _id: string;
  text: string;
}

const BASE_URL = 'http://localhost:1234';

const fetchWords = async (): Promise<Word[]> => {
  const response = await fetch(`${BASE_URL}/words`);
  if (!response.ok) {
    throw new Error('Failed to fetch words');
  }
  return response.json();
};

const fetchAdvice = async (): Promise<Advice[]> => {
  const response = await fetch(`${BASE_URL}/advice`);
  if (!response.ok) {
    throw new Error('Failed to fetch advice');
  }
  return response.json();
};

export { fetchWords, fetchAdvice };
export type { Word, Advice };
