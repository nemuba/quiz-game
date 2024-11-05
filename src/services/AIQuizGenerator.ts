import axios from 'axios';

interface AIQuizRequest {
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  numberOfQuestions: number;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export class AIQuizGenerator {
  private apiKey: string = import.meta.env.VITE_OPENAI_API_KEY;

  async generateQuiz(params: AIQuizRequest): Promise<QuizQuestion[]> {
    try {
      const systemPrompt = `Você é um gerador de quiz. Gere exatamente ${params.numberOfQuestions} questões sobre ${params.topic} com dificuldade ${params.difficulty}.
      Retorne APENAS um array JSON com objetos no seguinte formato:
      [
        {
          "question": "Pergunta aqui",
          "options": ["Opção 1", "Opção 2", "Opção 3", "Opção 4"],
          "correctAnswer": "Opção correta exatamente igual está nas options"
        }
      ]`;

      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: systemPrompt
            }
          ],
          temperature: 0.7
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const content = response.data.choices[0].message.content;

      try {
        // Tenta encontrar o array JSON na resposta
        const match = content.match(/\[[\s\S]*\]/);
        if (match) {
          const jsonContent = match[0];
          const parsedQuestions = JSON.parse(jsonContent);

          if (!Array.isArray(parsedQuestions)) {
            throw new Error('Resposta não é um array');
          }

          return parsedQuestions;
        }
        throw new Error('Invalid response format');
      } catch (parseError) {
        console.error('Resposta da API:', content);
        throw new Error('Error processing API response');
      }
    } catch (error) {
      console.error('Erro ao gerar quiz:', error);
      throw new Error('Failed to generate quiz with AI');
    }
  }
}
